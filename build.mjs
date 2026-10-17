#!/usr/bin/env node
// Builds every page of the static site from `src/pages/*.html` + `src/partials/*` +
// `src/strings/*.mjs`:
//   site/index.html     (vi, default)
//   site/en/index.html  (en)
// Usage: node build.mjs          write every page
//        node build.mjs --check  fail if the committed pages differ from a fresh build
//
// Adding a page is one row in PAGES plus one body template and one strings file; the chrome is
// never copied, which is the whole reason the partials exist.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { shared, SITE, MAIL, LEGAL } from './src/strings/shared.mjs';
import { landing } from './src/strings/landing.mjs';
import { privacy } from './src/strings/privacy.mjs';
import { deleteData } from './src/strings/delete-data.mjs';

const root = dirname(fileURLToPath(import.meta.url));

/** Locale-level facts. A page decides its own paths; a locale decides how it is labelled. */
const LOCALES = {
  vi: {
    htmlLang: 'vi',
    ogLocale: 'vi_VN',
    ogLocaleAlt: 'en_US',
    // A date in the output must not depend on the ICU data of whoever runs the build, so the month
    // names are a table rather than `Intl`.
    date: ([y, m, d]) => `ngày ${Number(d)} tháng ${Number(m)} năm ${y}`,
  },
  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    ogLocaleAlt: 'vi_VN',
    date: ([y, m, d]) =>
      `${Number(d)} ${['January','February','March','April','May','June','July','August','September','October','November','December'][Number(m) - 1]} ${y}`,
  },
};

/**
 * Every page of the site. `path` is both the URL and the output location, so a page cannot be
 * served from a path the build does not know about (`--check` fails on any html under `site/`
 * this table did not produce).
 */
const PAGES = [
  {
    id: 'landing',
    template: 'src/pages/landing.html',
    strings: landing,
    path: { vi: '/', en: '/en/' },
    // Old links used ?lang=en on the Vietnamese page; only that page carries the redirect.
    legacyRedirect: true,
  },
  {
    id: 'privacy',
    template: 'src/pages/privacy.html',
    strings: privacy,
    path: { vi: '/quyen-rieng-tu/', en: '/en/privacy/' },
  },
  {
    id: 'deleteData',
    template: 'src/pages/delete-data.html',
    strings: deleteData,
    path: { vi: '/xoa-du-lieu/', en: '/en/delete-my-data/' },
  },
];

/** Enough of HTML's entity set to stop `&#104;ttps://` reading as a local path. */
function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);?/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/gi, '&')
    .replace(/&sol;/gi, '/')
    .replace(/&colon;/gi, ':');
}

/**
 * One attribute of one tag, by exact name. A regex over the whole tag matched `data-src` for
 * `src`; this walks the attributes instead, so only the real one answers.
 */
function attrValue(tag, name) {
  const body = tag.replace(/^<\S+/, '').replace(/\/?>$/, '');
  const re = /([:\w.-]+)(?:\s*=\s*("[^"]*"|'[^']*'|[^\s>]+))?/g;
  for (const match of body.matchAll(re)) {
    if (match[1].toLowerCase() !== name.toLowerCase()) continue;
    return (match[2] ?? '').replace(/^["']|["']$/g, '');
  }
  return '';
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The tour, in flow order. File sizes are fixed by the screenshots in site/img.
const SHOTS = [
  { n: 1, img: 'create-type', w: 460, h: 1000, kind: 'ios' },
  { n: 2, img: 'mood', w: 460, h: 1000, kind: 'ios' },
  { n: 3, img: 'vote', w: 460, h: 1000, kind: 'ios' },
  { n: 4, img: 'match', w: 460, h: 1000, kind: 'ios' },
  { n: 5, img: 'plan', w: 460, h: 1000, kind: 'ios' },
  { n: 6, img: 'active', w: 460, h: 1000, kind: 'ios' },
  { n: 7, img: 'done', w: 460, h: 1000, kind: 'ios' },
];

/** `{{>name}}` pulls in `src/partials/name` (html or css), recursively. */
function partial(name) {
  try {
    return readFileSync(join(root, 'src/partials', name), 'utf8').replace(/\n$/, '');
  } catch {
    throw new Error(`unknown partial {{>${name}}} — expected src/partials/${name}`);
  }
}

function outputFile(path) {
  return join(root, 'site', path === '/' ? 'index.html' : `${path.replace(/^\/|\/$/g, '')}/index.html`);
}

function render(page, code) {
  const loc = LOCALES[code];
  const other = code === 'vi' ? 'en' : 'vi';
  const pageStrings = page.strings[code];
  const t = { ...shared[code], ...pageStrings };

  const langSwitch = ['vi', 'en']
    .map((c) => `<a href="${page.path[c]}" hreflang="${c}" lang="${c}"${c === code ? ' aria-current="page"' : ''}>${c.toUpperCase()}</a>`)
    .join('');

  const shots = SHOTS.map(
    (s) => `<li class="shot"><figure><div class="phone ${s.kind}"><div class="island" aria-hidden="true"></div><div class="screen"><img src="/img/${s.img}.png" width="${s.w}" height="${s.h}" loading="lazy" alt="{{a.s${s.n}}}"></div></div><figcaption><strong>{{s${s.n}.h}}</strong>{{s${s.n}.p}}</figcaption></figure></li>`,
  ).join('\n          ');

  const legacyRedirect =
    page.legacyRedirect && code === 'vi'
      ? `<script>if (/[?&]lang=en(&|$)/.test(location.search)) location.replace('/en/' + location.hash);</script>`
      : '';

  // Three hreflang lines per page, x-default pointing at the Vietnamese one: the product's default
  // language, and the URL submitted where a store console has only one field.
  const alternates = [
    `<link rel="alternate" hreflang="vi" href="${SITE}${page.path.vi}">`,
    `<link rel="alternate" hreflang="en" href="${SITE}${page.path.en}">`,
    `<link rel="alternate" hreflang="x-default" href="${SITE}${page.path.vi}">`,
  ].join('\n  ');

  // Every page is reachable from every other by id, in the current locale, so no partial has to
  // know a path.
  const links = Object.fromEntries(PAGES.map((p) => [`link.${p.id}`, p.path[code]]));

  // A legal constant nobody has decided yet renders as a visible token. `--check` still passes, so
  // the page is reviewable and mergeable; `--release` refuses, so it cannot be deployed.
  const legal = Object.fromEntries(
    Object.entries(LEGAL).map(([name, value]) => {
      if (value === null) return [`legal.${name}`, `⟦legal.${name}⟧`];
      if (name === 'effectiveDate') return [`legal.${name}`, loc.date(value.split('-'))];
      return [`legal.${name}`, String(value)];
    }),
  );

  const special = {
    ...links,
    ...legal,
    alternates,
    htmlLang: loc.htmlLang,
    canonical: SITE + page.path[code],
    site: SITE,
    path: page.path[code],
    ogLocale: loc.ogLocale,
    ogLocaleAlt: loc.ogLocaleAlt,
    otherPath: page.path[other],
    otherLang: other,
    mail: MAIL,
    langSwitch,
    shots,
    legacyRedirect,
  };

  const used = new Set();
  // Strings are filled recursively, like specials: prose refers to `{{@mail}}`, to a sibling page
  // via `{{@link.privacy}}`, and the legal pages refer to `{{@legal.*}}` constants. A depth cap
  // turns a self-referential string into an error instead of a hang.
  const fill = (src, depth = 0) => {
    if (depth > 8) throw new Error(`[${page.id}/${code}] placeholders nested more than 8 deep — a string refers to itself?`);
    return src
      .replace(/\{\{>([\w.-]+)\}\}/g, (_, name) => fill(partial(name), depth + 1))
      .replace(/\{\{(@?)([\w.]+)\}\}/g, (_, at, key) => {
        // `in` would accept anything on Object.prototype: `{{toString}}` rendered the function
        // source instead of throwing.
        if (at) {
          if (!Object.hasOwn(special, key)) throw new Error(`unknown special {{@${key}}}`);
          return fill(String(special[key]), depth + 1);
        }
        if (!Object.hasOwn(t, key)) throw new Error(`[${page.id}/${code}] missing string "${key}"`);
        used.add(key);
        // `a.` values land in attributes: escaped, and never a carrier for other placeholders.
        return key.startsWith('a.') ? esc(t[key]) : fill(t[key], depth + 1);
      });
  };

  const html = fill(readFileSync(join(root, page.template), 'utf8'));

  // Anything still looking like a placeholder means a value carried one that the pass above did not
  // reach — it would otherwise ship to the site as literal `{{…}}` text.
  const leftover = html.match(/\{\{[^}]{0,80}\}\}/g);
  if (leftover) throw new Error(`[${page.id}/${code}] unexpanded placeholder(s): ${[...new Set(leftover)].join(', ')}`);

  // Invariant C: no page may *fetch* a script, stylesheet, font or any other subresource from
  // another origin — nor warm one up with `preconnect`/`dns-prefetch`, which leaks the visitor's
  // address before anything is requested. The privacy page says this site collects nothing about
  // its visitors (#4); a third-party resource would make that false, quietly, in a commit about
  // something else.
  //
  // `canonical` and `alternate` are metadata, not fetches, and must stay absolute. Links in prose
  // are not resources either. So this reads `rel`, rather than any absolute URL in a tag.
  const FETCHING_REL = /^(stylesheet|preconnect|dns-prefetch|preload|modulepreload|prefetch|prerender)$/i;
  const isExternal = (url) => /^\s*(?:https?:)?\/\//i.test(decodeEntities(url));
  const offenders = [];

  for (const tag of html.match(/<(?:link|script)\b[^>]*>/gi) ?? []) {
    const isLink = /^<link/i.test(tag);
    // Exact attribute names: `\bsrc` also matched `data-src`, so a tag could advertise a local
    // value to this check while the browser fetched the external one.
    const url = isLink ? attrValue(tag, 'href') : attrValue(tag, 'src');
    const rels = attrValue(tag, 'rel').split(/\s+/).filter(Boolean);
    if (!url || !isExternal(url)) continue;
    if (!isLink || rels.some((rel) => FETCHING_REL.test(rel))) offenders.push(tag.trim());
  }

  // CSS fetches too: an `@font-face { src: url(https://fonts.gstatic.com/…) }` is exactly the
  // request this invariant exists to stop, and it never appears in a tag.
  for (const m of html.matchAll(/url\(\s*(["']?)([^)"']+)\1\s*\)/gi)) {
    if (isExternal(m[2])) offenders.push(m[0].trim());
  }
  for (const m of html.matchAll(/@import\s+(?:url\(\s*)?(["']?)([^;)"']+)\1/gi)) {
    if (isExternal(m[2])) offenders.push(m[0].trim());
  }

  if (offenders.length) {
    throw new Error(`[${page.id}/${code}] external resource, see Invariant C in build.mjs:\n  ${[...new Set(offenders)].join('\n  ')}`);
  }

  return { html, used };
}

// Invariant B, per strings file: a key present in one locale and not the other is a page that
// renders in one language and throws in the other.
for (const [name, table] of [['shared', shared], ...PAGES.map((p) => [`${p.id} (${p.template})`, p.strings])]) {
  const keys = (c) => Object.keys(table[c]).sort().join('\n');
  if (keys('vi') !== keys('en')) {
    const vi = new Set(Object.keys(table.vi));
    const en = new Set(Object.keys(table.en));
    throw new Error(
      `${name}: locale keys differ — only vi: ${[...vi].filter((k) => !en.has(k))}; only en: ${[...en].filter((k) => !vi.has(k))}`,
    );
  }
}

// A key defined in both shared and a page file resolves by merge order rather than by intent, so
// the next reader cannot tell which one is live.
for (const page of PAGES) {
  for (const code of Object.keys(LOCALES)) {
    const clash = Object.keys(page.strings[code]).filter((k) => k in shared[code]);
    if (clash.length) throw new Error(`[${page.id}/${code}] defined in both shared and the page file: ${clash.join(', ')}`);
  }
}

const check = process.argv.includes('--check');
const release = process.argv.includes('--release');
const rendered = [];

for (const page of PAGES) {
  for (const code of Object.keys(LOCALES)) {
    const { html, used } = render(page, code);
    // Per page, not pooled across pages: a union would let a second page drop the footer partial
    // entirely and still pass, because the landing page had already used those keys.
    const missed = Object.keys(shared[code]).filter((k) => !used.has(k));
    if (missed.length) {
      throw new Error(
        `[${page.id}/${code}] shared strings this page never renders: ${missed.join(', ')} — either the page is missing a shared partial, or those keys belong to the pages that use them`,
      );
    }
    rendered.push({ page, code, html, file: outputFile(page.path[code]) });
  }
}

let stale = 0;
for (const { html, file } of rendered) {
  if (check) {
    let current = '';
    try { current = readFileSync(file, 'utf8'); } catch {}
    if (current !== html) { console.error(`stale: ${relative(root, file)} — run node build.mjs`); stale++; }
  } else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`wrote ${relative(root, file)} (${html.length} bytes)`);
  }
}

if (check) {
  // A page added to `site/` by hand would be served and never checked against a source.
  const produced = new Set(rendered.map(({ file }) => file));
  const walk = (dir) =>
    readdirSync(dir).flatMap((entry) => {
      const path = join(dir, entry);
      return statSync(path).isDirectory() ? walk(path) : [path];
    });
  const orphans = walk(join(root, 'site')).filter((p) => p.endsWith('.html') && !produced.has(p));
  if (orphans.length) {
    console.error(`orphan pages under site/ — no PAGES row produces them: ${orphans.map((p) => relative(root, p)).join(', ')}`);
    stale++;
  }
}

// Printed on every build, so an unset constant is visible without reading the pages.
const unsetLegal = Object.entries(LEGAL).filter(([, v]) => v === null).map(([k]) => k);
if (unsetLegal.length) console.log(`unset legal constants: ${unsetLegal.join(', ')}`);

if (release) {
  // The deploy gate: a visible token in a published legal page is worse than an unpublished one.
  const withTokens = rendered.filter(({ html }) => html.includes('⟦'));
  if (withTokens.length) {
    console.error(
      `refusing to release: unresolved legal constants in ${withTokens.map(({ file }) => relative(root, file)).join(', ')}` +
        (unsetLegal.length ? ` — set ${unsetLegal.join(', ')} in src/strings/shared.mjs` : ''),
    );
    stale++;
  }
}

if (stale) process.exit(1);
if (check) console.log('pages match sources');
