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
import { shared, SITE, MAIL } from './src/strings/shared.mjs';
import { landing } from './src/strings/landing.mjs';

const root = dirname(fileURLToPath(import.meta.url));

/** Locale-level facts. A page decides its own paths; a locale decides how it is labelled. */
const LOCALES = {
  vi: { htmlLang: 'vi', ogLocale: 'vi_VN', ogLocaleAlt: 'en_US' },
  en: { htmlLang: 'en', ogLocale: 'en_US', ogLocaleAlt: 'vi_VN' },
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
];

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

  const special = {
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
  const fill = (src) =>
    src
      .replace(/\{\{>([\w.-]+)\}\}/g, (_, name) => fill(partial(name)))
      .replace(/\{\{(@?)([\w.]+)\}\}/g, (_, at, key) => {
        if (at) {
          if (!(key in special)) throw new Error(`unknown special {{@${key}}}`);
          return fill(special[key]);
        }
        if (!(key in t)) throw new Error(`[${page.id}/${code}] missing string "${key}"`);
        used.add(key);
        return key.startsWith('a.') ? esc(t[key]) : t[key];
      });

  const html = fill(readFileSync(join(root, page.template), 'utf8'));

  // Invariant C: no page may *fetch* a script, stylesheet or font from another origin — nor warm
  // one up with `preconnect`/`dns-prefetch`, which leaks the visitor's address before anything is
  // requested. The privacy page says this site collects nothing about its visitors (#4); a
  // third-party resource would make that false, quietly, in a commit about something else.
  //
  // `canonical` and `alternate` are metadata, not fetches, and must stay absolute. Links in prose
  // are not resources either. So this reads `rel`, rather than any absolute URL in a tag.
  const FETCHING_REL = /^(stylesheet|preconnect|dns-prefetch|preload|modulepreload|prefetch|prerender)$/i;
  const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s>]+)`, 'i'))?.[1]?.replace(/^["']|["']$/g, '') ?? '';
  const isExternal = (url) => /^(?:https?:)?\/\//i.test(url.trim());
  const offenders = [];
  for (const tag of html.match(/<(?:link|script)\b[^>]*>/gi) ?? []) {
    const isLink = /^<link/i.test(tag);
    const rels = attr(tag, 'rel').split(/\s+/).filter(Boolean);
    const url = isLink ? attr(tag, 'href') : attr(tag, 'src');
    if (!url || !isExternal(url)) continue;
    if (!isLink || rels.some((rel) => FETCHING_REL.test(rel))) offenders.push(tag.trim());
  }
  const atImport = html.match(/@import\s+(?:url\()?\s*["']?(?:https?:)?\/\/[^\s;)'"]+/i);
  if (atImport) offenders.push(atImport[0]);
  if (offenders.length) {
    throw new Error(`[${page.id}/${code}] external resource, see Invariant C in build.mjs:\n  ${offenders.join('\n  ')}`);
  }

  // Invariant A, per page: a string this page defines and never renders is either dead weight or
  // a key that silently stopped being reachable.
  const unusedPage = Object.keys(pageStrings).filter((k) => !used.has(k));
  if (unusedPage.length) throw new Error(`[${page.id}/${code}] unused strings: ${unusedPage.join(', ')}`);

  return { html, used };
}

// Invariant B, per strings file: a key present in one locale and not the other is a page that
// renders in one language and throws in the other.
for (const [name, table] of [['shared', shared], ['landing', landing]]) {
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
const rendered = [];
const sharedUse = Object.fromEntries(Object.keys(LOCALES).map((c) => [c, new Set()]));

for (const page of PAGES) {
  for (const code of Object.keys(LOCALES)) {
    const { html, used } = render(page, code);
    for (const key of used) if (key in shared[code]) sharedUse[code].add(key);
    rendered.push({ page, code, html, file: outputFile(page.path[code]) });
  }
}

// A shared string used by only some pages is not shared — it belongs to the pages that use it,
// or the partial that renders it is not on every page.
for (const code of Object.keys(LOCALES)) {
  const unused = Object.keys(shared[code]).filter((k) => !sharedUse[code].has(k));
  if (unused.length) throw new Error(`shared/${code}: strings not used on every page: ${unused.join(', ')}`);
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

if (stale) process.exit(1);
if (check) console.log('pages match sources');
