// Strings every page needs, because the shared partials (head, header, footer) reference them.
//
// Required *page* keys, defined in each page's own file rather than here, because every page
// titles and describes itself: `a.title`, `a.desc`, `a.ogDesc`.
//
// `build.mjs` throws when a key here goes unused on any page, when the same key is defined both
// here and in a page file, or when vi and en disagree about this file's keys.
export const MAIL = 'namnh@gogo.id.vn';

export const SITE = 'https://gogo.id.vn';

export const shared = {
  vi: {
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
      'foot.photo': 'Ảnh địa điểm trong ảnh chụp app:',
  },
  en: {
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
      'foot.photo': 'Place photos in the app screenshots:',
  },
};
