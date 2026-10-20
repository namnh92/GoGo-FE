#!/usr/bin/env node
// Builds the static language pages from src/template.html + src/strings.mjs:
//   site/index.html     (vi, default)
//   site/en/index.html  (en)
// Usage: node build.mjs          write both pages
//        node build.mjs --check  fail if the committed pages differ from a fresh build
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales, SITE, MAIL } from './src/strings.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const template = readFileSync(join(root, 'src/template.html'), 'utf8');

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

// Technology we use — verified in the GoGo repos (BE/Mobile/CMS/Infra manifests), plus Adjust,
// whose integration is in progress (GoGo-MobileApp#363). Names are brand names, not translated.
const STACK = [
  ['claude.svg', 'Claude Code'], ['cloudflare.svg', 'Cloudflare'], ['aws.svg', 'AWS'],
  ['googlecloud.svg', 'Google Cloud'], ['sentry.svg', 'Sentry'], ['onesignal.svg', 'OneSignal'],
  ['tenjin.svg', 'Tenjin'], ['adjust.svg', 'Adjust'], ['expo.svg', 'Expo'],
  ['react.svg', 'React Native'], ['nestjs.svg', 'NestJS'], ['postgresql.svg', 'PostgreSQL'],
  ['neon.svg', 'Neon'], ['upstash.svg', 'Upstash'], ['drizzle.svg', 'Drizzle'], ['terraform.svg', 'Terraform'],
];

function render(code) {
  const loc = locales[code];
  const other = code === 'vi' ? 'en' : 'vi';
  const t = loc.strings;

  const langSwitch = ['vi', 'en']
    .map((c) => `<a href="${locales[c].path}" hreflang="${c}" lang="${c}"${c === code ? ' aria-current="page"' : ''}>${c.toUpperCase()}</a>`)
    .join('');

  const shots = SHOTS.map(
    (s) => `<li class="shot"><figure><div class="phone ${s.kind}"><div class="island" aria-hidden="true"></div><div class="screen"><img src="/img/${s.img}.png" width="${s.w}" height="${s.h}" loading="lazy" alt="{{a.s${s.n}}}"></div></div><figcaption><strong>{{s${s.n}.h}}</strong>{{s${s.n}.p}}</figcaption></figure></li>`,
  ).join('\n          ');

  // Old links used ?lang=en on the Vietnamese page; send them to the real English URL.
  const legacyRedirect =
    code === 'vi'
      ? `<script>if (/[?&]lang=en(&|$)/.test(location.search)) location.replace('/en/' + location.hash);</script>`
      : '';

  const stack = STACK.map(([f, name]) => `<li><img src="/img/logos/${f}" alt="" height="32" loading="lazy">${name}</li>`).join('\n          ');

  const special = {
    htmlLang: loc.htmlLang,
    canonical: SITE + loc.path,
    site: SITE,
    path: loc.path,
    ogLocale: loc.ogLocale,
    ogLocaleAlt: loc.ogLocaleAlt,
    otherPath: loc.otherPath,
    otherLang: other,
    mail: MAIL,
    langSwitch,
    shots,
    legacyRedirect,
    stack,
  };

  const used = new Set();
  const fill = (src) =>
    src.replace(/\{\{(@?)([\w.]+)\}\}/g, (_, at, key) => {
      if (at) {
        if (!(key in special)) throw new Error(`unknown special {{@${key}}}`);
        return fill(special[key]);
      }
      if (!(key in t)) throw new Error(`[${code}] missing string "${key}"`);
      used.add(key);
      return key.startsWith('a.') ? esc(t[key]) : t[key];
    });

  const html = fill(template);
  const unused = Object.keys(t).filter((k) => !used.has(k));
  if (unused.length) throw new Error(`[${code}] unused strings: ${unused.join(', ')}`);
  return html;
}

// Both locales must define exactly the same keys.
const keys = (c) => Object.keys(locales[c].strings).sort().join('\n');
if (keys('vi') !== keys('en')) {
  const vi = new Set(Object.keys(locales.vi.strings));
  const en = new Set(Object.keys(locales.en.strings));
  throw new Error(
    `locale keys differ — only vi: ${[...vi].filter((k) => !en.has(k))}; only en: ${[...en].filter((k) => !vi.has(k))}`,
  );
}

const outputs = { vi: join(root, 'site/index.html'), en: join(root, 'site/en/index.html') };
const check = process.argv.includes('--check');
let stale = 0;
for (const [code, file] of Object.entries(outputs)) {
  const html = render(code);
  if (check) {
    let current = '';
    try { current = readFileSync(file, 'utf8'); } catch {}
    if (current !== html) { console.error(`stale: ${file} — run node build.mjs`); stale++; }
  } else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`wrote ${file.replace(root + '/', '')} (${html.length} bytes)`);
  }
}
if (stale) process.exit(1);
if (check) console.log('pages match sources');
