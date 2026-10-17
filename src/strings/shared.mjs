// Strings every page needs, because the shared partials (head, header, footer) reference them.
//
// Required *page* keys, defined in each page's own file rather than here, because every page
// titles and describes itself: `a.title`, `a.desc`, `a.ogDesc`.
//
// `build.mjs` throws when a key here goes unused on any page, when the same key is defined both
// here and in a page file, or when vi and en disagree about this file's keys.
//
// Editing rules, carried over from the single strings module this file replaced:
//   - verified facts only; a claim nobody can check does not go on the site, and anything not built
//     yet is labelled as planned rather than described as working;
//   - values are raw HTML and are interpolated as-is, so markup belongs in them deliberately;
//   - `a.*` keys are HTML-escaped by `build.mjs` because they land in attributes — never put markup
//     in one.
export const MAIL = 'namnh@gogo.id.vn';

export const SITE = 'https://gogo.id.vn';

/**
 * Facts only the owner can decide, and the pages cannot be deployed without.
 *
 * `null` renders as a visible `⟦legal.name⟧` token: `node build.mjs` and `--check` pass, so the
 * wording is reviewable and the PR is mergeable, while `--check --release` (the deploy line in
 * README) refuses to ship a page with a token still in it.
 */
export const LEGAL = {
  /** Printed in the privacy policy as the person responsible for the data. */
  ownerName: null,
  /** 'YYYY-MM-DD'; rendered per locale by the date table in build.mjs. */
  effectiveDate: null,
  /** Hours to acknowledge a privacy request. ADR-0011's engineering default is 72, pending Legal. */
  ackWithinHours: null,
  /** Days to complete one. ADR-0011's engineering default is 30, pending Legal. */
  completeWithinDays: null,
  /** Months a request record is kept after closure. ADR-0011's provisional figure is 12. */
  ledgerRetentionMonths: null,
};

export const shared = {
  vi: {
      'foot.privacy': 'Quyền riêng tư',
      'foot.delete': 'Xoá dữ liệu',
      'a.brandHome': 'GoGo VN — trang chủ',
      'a.navLabel': 'Điều hướng chính',
      'a.langLabel': 'Ngôn ngữ',
      skip: 'Bỏ qua, tới nội dung chính',

      'nav.demo': 'Sản phẩm',
      'nav.how': 'Cách hoạt động',
      'nav.stage': 'Tiến độ',
      'nav.contact': 'Liên hệ',

      'foot.project': 'Dự án startup Việt Nam · chưa có pháp nhân',
      'foot.support': 'Hỗ trợ:',
      'foot.lang': 'English version',
  },
  en: {
      'foot.privacy': 'Privacy',
      'foot.delete': 'Delete your data',
      'a.brandHome': 'GoGo VN — home',
      'a.navLabel': 'Main navigation',
      'a.langLabel': 'Language',
      skip: 'Skip to main content',

      'nav.demo': 'Product',
      'nav.how': 'How it works',
      'nav.stage': 'Progress',
      'nav.contact': 'Contact',

      'foot.project': 'A Vietnamese startup project · no legal entity yet',
      'foot.support': 'Support:',
      'foot.lang': 'Phiên bản tiếng Việt',
  },
};
