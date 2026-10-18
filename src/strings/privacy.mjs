// Privacy policy (`/quyen-rieng-tu/`, `/en/privacy/`).
//
// Rule, same as `GoGo-MobileApp/docs/store-privacy.md:7-9`: every clause here carries the source it
// rests on. A clause with no source is dropped, not guessed — a wrong claim on this page is worse
// than a missing one. Vietnamese is written first and is the text the owner signs; English is a
// faithful translation for store reviewers.
//
// Deliberately absent, because nothing in the repos supports them and they are the owner's lawyer's
// to add: a statute citation, a minimum-age statement, where the data physically sits, a "we do not
// sell your data" affirmation, and any claim about a signed DPA.
import { MAIL } from './shared.mjs';

const MAILTO = `mailto:${MAIL}`;

export const privacy = {
  vi: {
      // Required page key: the footer renders it on every page. The photo credit belongs to the
      // landing page, which is where the photos are.
      'foot.credits': '',
    'a.title': 'Chính sách quyền riêng tư — GoGo',
    'a.desc': 'GoGo nhận dữ liệu nào, vì sao, ai nhận được nó, giữ bao lâu, và bạn làm gì để lấy lại hoặc xoá đi.',
    'a.ogDesc': 'GoGo nhận dữ liệu nào, vì sao, ai nhận được nó, giữ bao lâu, và quyền của bạn.',

    'p.h1': 'Chính sách quyền riêng tư của GoGo',
    // Phạm vi: ứng dụng (store-privacy.md §1) + trang này (GoGo-FE wrangler.jsonc).
    'p.lead': 'Áp dụng cho ứng dụng GoGo trên iOS và Android, và cho trang gogo.id.vn.',
    'p.effective': 'Hiệu lực từ {{@legal.effectiveDate}}',
    'p.otherLang': 'English →',

    // §1 — owner chốt 2026-10-18: cá nhân chịu trách nhiệm, không pháp nhân. Trang chủ đã nói công
    // khai "chưa có pháp nhân" (src/strings/landing.mjs, khoá stage.about.1) nên trang này không
    // được nói ngược lại.
    's1.h': '1. Ai chịu trách nhiệm',
    's1.p': `<p>GoGo là một dự án cá nhân, chưa có pháp nhân. Người chịu trách nhiệm về dữ liệu của bạn là {{@legal.ownerName}}. Mọi câu hỏi về quyền riêng tư gửi tới <a href="${MAILTO}">{{@mail}}</a>.</p>`,

    // §2 — từng dòng dẫn store-privacy.md §2 (D1–D23). "Bắt buộc" theo cột cuối của bảng đó.
    's2.h': '2. Dữ liệu GoGo nhận từ bạn và từ ứng dụng',
    's2.p': '<p>Danh sách này là đầy đủ: nó được dựng từ bảng dữ liệu của chính ứng dụng, nơi mỗi dòng dẫn tới đoạn mã gửi dữ liệu đó đi.</p>',
    's2.thWhat': 'Dữ liệu',
    's2.thWhy': 'Dùng để làm gì',
    's2.thNeed': 'Bắt buộc?',
    's2.rows': [
      // D1–D3
      '          <tr><td>Email và mật khẩu</td><td>Tạo và đăng nhập tài khoản</td><td>Bắt buộc khi đăng ký</td></tr>',
      '          <tr><td>Tên hiển thị</td><td>Hiện tên bạn trong phòng</td><td>Bắt buộc khi đăng ký và khi vào phòng với tư cách khách</td></tr>',
      // D4, D5
      '          <tr><td>Ngày sinh, ảnh đại diện</td><td>Hồ sơ của bạn</td><td>Tuỳ chọn</td></tr>',
      // D17, D19
      '          <tr><td>Nội dung phòng: tên, ngày giờ, ngân sách và chế độ chia, khu vực, thành viên, lời mời</td><td>Chức năng cốt lõi: chốt chỗ đi chơi cùng nhóm</td><td>Bắt buộc theo luồng</td></tr>',
      // D18, D22
      '          <tr><td>Sở thích đã chọn, lượt vuốt, lượt bỏ phiếu, thay đổi lịch trình</td><td>Ghép lựa chọn của nhóm và dựng lịch trình</td><td>Bắt buộc theo luồng</td></tr>',
      // D20, D21
      '          <tr><td>Mục đã lưu, cài đặt thông báo</td><td>Danh sách đã lưu; tôn trọng lựa chọn nhận thông báo</td><td>Tuỳ chọn</td></tr>',
      // D10 — toạ độ lưu trên phòng; có đường chọn khu vực thủ công (app.config.ts:271-274).
      '          <tr><td>Vị trí chính xác — chỉ khi bạn chọn “dùng vị trí của tôi”</td><td>Gợi ý địa điểm gần bạn; được lưu trên phòng làm điểm xuất phát của lịch trình</td><td>Tuỳ chọn — bạn có thể tự chọn khu vực thay vì cấp quyền</td></tr>',
      // D11
      '          <tr><td>Từ khoá bạn tìm địa điểm</td><td>Tìm kiếm</td><td>Tuỳ chọn</td></tr>',
      // D6, D7, D9 — số tiền tự khai: store-privacy §12 D-3.
      '          <tr><td>Ảnh check-in (tối đa 3) và ảnh hoá đơn; số tiền hoá đơn và số người; điểm, ghi chú, tag</td><td>Nhật ký buổi đi chơi và chia tiền</td><td>Tuỳ chọn</td></tr>',
      // D8
      '          <tr><td>Đánh giá địa điểm: điểm và nội dung chữ</td><td>Hiện cho người dùng khác sau khi kiểm duyệt</td><td>Tuỳ chọn</td></tr>',
      // D23
      '          <tr><td>Đề xuất địa điểm: link Google Maps bạn dán, ghi chú, phân loại, mood, khoảng giá</td><td>Thêm địa điểm mới vào GoGo, sau kiểm duyệt</td><td>Tuỳ chọn</td></tr>',
      // D12, D13
      // D12 (mã đăng ký + nền tảng → máy chủ GoGo) và D13 (id người dùng + token ES256 → OneSignal)
      // là hai đích khác nhau; gộp vào một dòng "gửi cho OneSignal" là khai sai bên nhận.
      '          <tr><td>Mã đăng ký push và nền tảng gửi cho máy chủ GoGo; id người dùng và token ES256 ngắn hạn gửi cho OneSignal</td><td>Gửi thông báo đúng người</td><td>Tuỳ chọn, theo quyền thông báo</td></tr>',
      // D14
      '          <tr><td>Sự kiện cài đặt và mở ứng dụng, cùng tham số attribution, gửi cho Tenjin</td><td>Đo nguồn cài đặt và mở deferred deep link</td><td>Tuỳ chọn</td></tr>',
      // D15, D16
      '          <tr><td>Báo lỗi, sự cố và breadcrumb đã lọc: id người dùng khi đã đăng nhập, nếu không là id bản cài; dữ liệu release-health của phiên gồm sid, did là id bản cài, trạng thái, bộ đếm và seq</td><td>Sửa lỗi và đo tỉ lệ phiên không sự cố</td><td>Tuỳ theo DSN của bản build</td></tr>',
    ].join('\n'),
    // store-privacy.md §2, dòng "Không gửi".
    's2.not': '<p>GoGo <strong>không</strong> gửi đi: danh bạ, lịch, tin nhắn, dữ liệu sức khoẻ, thông tin thanh toán, mật khẩu của dịch vụ khác, và không đọc vị trí khi ứng dụng chạy nền.</p>',
    // D-1 của store-privacy §2: hành vi chuyển tiếp, không phải thu thập (directions.ts:7).
    's2.directions': '<p>Khi bạn bấm “Chỉ đường”, ứng dụng mở Google Maps kèm địa chỉ điểm đến. Bạn tự bấm, GoGo không gửi gì thêm — nhưng Google nhận địa chỉ đó qua trình duyệt hoặc ứng dụng Maps của bạn.</p>',

    // §3 — store-privacy.md §3 (T1–T4), dẫn tài liệu nhà cung cấp.
    's3.h': '3. Dữ liệu các SDK trong ứng dụng tự thu',
    's3.p': '<p>Bốn thư viện của bên khác chạy trong ứng dụng và tự thu dữ liệu, dù GoGo không viết dòng nào để gửi:</p>',
    's3.onesignal': '<strong>OneSignal</strong> (thông báo đẩy) — theo tài liệu của họ: hệ điều hành, ngôn ngữ, múi giờ, quốc gia, phiên bản ứng dụng, model thiết bị, tên gói, nhà mạng, địa chỉ IP, mã thông báo đẩy, cùng dữ liệu phiên và trạng thái quyền thông báo. GoGo <strong>không</strong> bật tính năng vị trí của OneSignal.',
    // Android: AD_ID + App Set + Install Referrer (plugins/with-tenjin-android.js:6-8,23).
    // iOS: không có expo-tracking-transparency, không có NSUserTrackingUsageDescription.
    's3.tenjin': '<strong>Tenjin</strong> (đo nguồn cài đặt) — theo tài liệu của họ: định danh thiết bị, địa chỉ IP, loại và model máy, ngôn ngữ, quốc gia, nền tảng và phiên bản hệ điều hành, tên gói, phiên bản SDK và ứng dụng, thiết lập Giới hạn theo dõi quảng cáo, và dữ liệu phân bổ Apple Search nếu bật. Trên Android, bản build khai quyền đọc mã quảng cáo và kèm App Set ID cùng Install Referrer của Play. Trên iOS <strong>không có màn hỏi theo dõi</strong>, nên Tenjin không nhận được mã quảng cáo của Apple; chỉ còn định danh theo nhà phát triển và địa chỉ IP.',
    // scrubIPAddresses + rule $user.geo.** (GoGo-Infra#208, #215) — là thiết lập console, kiểm lại trước mỗi lần nộp.
    's3.sentry': '<strong>Sentry</strong> (báo lỗi) — ngữ cảnh thiết bị, hệ điều hành và ứng dụng do SDK gắn sẵn. Dự án được cấu hình để <strong>không lưu địa chỉ IP</strong> và không lưu vị trí suy ra từ IP. Không có theo dõi hiệu năng, không có Session Replay (ghi lại nội dung phiên), không chụp màn hình và không thu cây phân cấp giao diện.',
    // react-native-maps đặt PROVIDER_GOOGLE trên cả hai nền tảng (map-canvas.view.tsx:95-97).
    's3.maps': '<strong>SDK Google Maps</strong> (bản đồ trong ứng dụng, dùng trên cả iOS và Android) — Google nhận khoá API, thông tin thiết bị và ứng dụng, địa chỉ IP, vùng bản đồ được yêu cầu và toạ độ các điểm được ghim, tức là những địa điểm trong kế hoạch của bạn. Ứng dụng tắt phần SDK đọc vị trí thiết bị.',

    // §4 — store-privacy.md §4 (chuỗi quyền trong app.config.ts).
    's4.h': '4. Quyền ứng dụng xin trên máy bạn',
    's4.list': [
      '        <li><strong>Vị trí khi đang dùng ứng dụng</strong> — để gợi ý địa điểm gần bạn. Tuỳ chọn: bạn có thể tự chọn khu vực.</li>',
      '        <li><strong>Thư viện ảnh</strong> — để thêm ảnh đại diện và ảnh check-in.</li>',
      '        <li><strong>Thông báo</strong> — để báo khi có người vào phòng, có kết quả bình chọn, hoặc tới giờ đi.</li>',
    ].join('\n'),
    's4.not': '<p>Ứng dụng <strong>không</strong> xin: vị trí khi chạy nền, camera, danh bạ, lịch, micro.</p>',

    // §5 — store-privacy.md §1 (năm đích) + nhà cung cấp hạ tầng (GoGo-BE README, Infra spec).
    's5.h': '5. Ai nhận dữ liệu của bạn',
    's5.list': [
      '        <li><strong>Máy chủ GoGo</strong> (<code>api-*.gogo.id.vn</code>) — nơi tài khoản, phòng, lịch trình và nội dung bạn tạo được lưu.</li>',
      '        <li><strong>OneSignal</strong> — gửi thông báo đẩy thay GoGo.</li>',
      // store-privacy §12 D-2: owner khai Tenjin là bên thứ ba nhận dữ liệu chia sẻ.
      '        <li><strong>Tenjin</strong> — đo xem bản cài đặt đến từ đâu. GoGo khai Tenjin là <strong>bên thứ ba nhận dữ liệu được chia sẻ</strong>, không phải bên chỉ xử lý thay GoGo: họ nhận định danh thiết bị và sự kiện cài đặt, mở ứng dụng.</li>',
      '        <li><strong>Sentry</strong> — nhận báo lỗi và dữ liệu phiên để GoGo sửa lỗi.</li>',
      // ADR-0007:95-99 — BE gửi điểm xuất phát + toạ độ địa điểm cho Routes để tính thời gian đi.
      '        <li><strong>Google Maps Platform</strong> — vẽ bản đồ trong ứng dụng, và tính thời gian di chuyển: máy chủ GoGo gửi điểm xuất phát bạn chọn cùng toạ độ các điểm dừng cho Google.</li>',
    ].join('\n'),
    's5.hosting': '<p>Hạ tầng chạy GoGo cũng xử lý dữ liệu thay GoGo: cơ sở dữ liệu PostgreSQL tại Neon, bộ đệm Redis tại Upstash, ảnh và tệp tại Cloudflare R2, và Cloudflare cho mạng biên. Khoá bí mật nằm ở AWS SSM và không chứa dữ liệu cá nhân.</p>',

    // §6 — privacy-jobs.ts (số thật đang chạy) + ADR-0011 (hồ sơ yêu cầu) + ADR-0033 (tệp export).
    's6.h': '6. Giữ bao lâu',
    's6.list': [
      '        <li>Dữ liệu tài khoản: trong thời gian tài khoản còn tồn tại, sau đó theo mục 8.</li>',
      '        <li><strong>Toạ độ chính xác của điểm xuất phát: xoá 30 ngày sau khi phòng kết thúc.</strong> Địa chỉ bạn tự nhập thì giữ lại.</li>',
      '        <li>Chữ bạn nhập khi tìm kiếm: 90 ngày (chỉ còn số lượt, không còn chữ).</li>',
      '        <li>Bản ghi lần đăng nhập: 30 ngày.</li>',
      '        <li>Phiên của khách chưa đăng ký: 7 ngày sau khi hết hạn thì bị thu hồi và ẩn danh.</li>',
      '        <li>Tệp dữ liệu bạn yêu cầu xuất: tự xoá 24 giờ sau khi sẵn sàng, và chỉ tải được một lần.</li>',
      '        <li>Hồ sơ một yêu cầu về quyền riêng tư: {{@legal.ledgerRetentionMonths}} tháng sau khi đóng, làm bằng chứng đã xử lý.</li>',
      '        <li>Các mốc trên do một tác vụ chạy mỗi ngày thực hiện.</li>',
    ].join('\n'),

    // §7 — chỉ nói điều dẫn được: argon2id (password.service.ts:10,24, ADR-0003).
    // Câu HTTPS cố ý KHÔNG có: store-privacy.md §1 nói đó là khẳng định có điều kiện, chưa đo trên
    // manifest bản release (GoGo-MobileApp#350/#351).
    's7.h': '7. Bảo mật',
    's7.p': '<p>Mật khẩu không được lưu dưới dạng đọc lại được: GoGo lưu bản băm Argon2id. Phiên đăng nhập trên máy bạn nằm trong Keychain của iOS hoặc Keystore của Android.</p>',

    // §8 — đường trong app (nhãn thật của GoGo-MobileApp) + trang xoá dữ liệu.
    's8.h': '8. Quyền của bạn',
    's8.list': [
      // Giới hạn 3 lần/giờ là thật, chặn phía máy chủ: GoGo-MobileApp `src/shared/i18n/vi.ts:69`
      // ("Mỗi giờ tối đa 3 lần") và `src/features/account/account.view.tsx:169`
      // ("rate-limited server-side (3/hour)").
      '        <li><strong>Xuất dữ liệu</strong> — trong ứng dụng: Cá nhân → ⚙️ Tài khoản → Dữ liệu của bạn → Xuất dữ liệu (tối đa 3 lần mỗi giờ). Tệp chỉ tải được từ phiên của chính bạn, nên GoGo không gửi nó qua email.</li>',
      '        <li><strong>Xoá tài khoản</strong> — trong ứng dụng: Cá nhân → ⚙️ Tài khoản → Xoá tài khoản. Không mở được ứng dụng thì xem <a href="{{@link.deleteData}}">trang xoá dữ liệu</a>.</li>',
      '        <li><strong>Sửa dữ liệu</strong> — sửa hồ sơ trong ứng dụng; các trường tuỳ chọn có thể để trống.</li>',
      '        <li><strong>Rút lại cho phép</strong> — quyền vị trí, ảnh và thông báo tắt được trong cài đặt hệ điều hành; công tắc thông báo cũng có trong ứng dụng.</li>',
      `        <li><strong>Hỏi chuyện khác</strong> — gửi <a href="${MAILTO}">{{@mail}}</a>; yêu cầu được ghi vào hồ sơ như mục 6 nói.</li>`,
    ].join('\n'),

    // §9 — trang này: tĩnh trên Cloudflare Workers; không analytics/cookie; một script nội tuyến
    // ?lang=en (build.mjs); font tự host từ #4; Cloudflare có thể đặt cookie kỹ thuật khi chạy
    // kiểm tra bảo mật (tài liệu nhà cung cấp).
    's9.h': '9. Trang web này',
    's9.p': '<p>gogo.id.vn là trang tĩnh chạy trên Cloudflare Workers. Trang <strong>không đặt cookie, không có analytics, không có script theo dõi, và không nạp gì từ máy chủ của bên khác</strong> — phông chữ được phục vụ từ chính tên miền này. Trang chủ bản tiếng Việt có một đoạn script nhỏ nằm ngay trong trang, chỉ đọc địa chỉ URL để chuyển các link <code>?lang=en</code> cũ sang bản tiếng Anh. Cloudflare xử lý địa chỉ IP và thông tin yêu cầu để phục vụ và bảo vệ trang, và có thể đặt một cookie kỹ thuật khi hiển thị bước kiểm tra bảo mật.</p>',

    // §10 — không hứa thông báo (không có cơ chế); lịch sử sửa đổi công khai trên GitHub.
    's10.h': '10. Khi chính sách thay đổi',
    's10.p': '<p>Bản mới được đăng tại chính địa chỉ này kèm ngày hiệu lực mới. GoGo chưa có cơ chế thông báo trong ứng dụng hay qua email, nên không hứa điều đó. Toàn bộ lịch sử sửa đổi là công khai: <a href="https://github.com/namnh92/GoGo-FE/commits/master/src/strings/privacy.mjs">lịch sử trang này trên GitHub</a>.</p>',

    's11.h': '11. Liên hệ',
    's11.p': `<p>Email: <a href="${MAILTO}">{{@mail}}</a>.</p>`,
  },
  en: {
      // Required page key: the footer renders it on every page. The photo credit belongs to the
      // landing page, which is where the photos are.
      'foot.credits': '',
    'a.title': 'Privacy policy — GoGo',
    'a.desc': 'What GoGo receives, why, who else receives it, how long it is kept, and what you can do to get it back or have it deleted.',
    'a.ogDesc': 'What GoGo receives, why, who else receives it, how long it is kept, and your rights.',

    'p.h1': 'GoGo privacy policy',
    'p.lead': 'Applies to the GoGo app on iOS and Android, and to gogo.id.vn.',
    'p.effective': 'In effect from {{@legal.effectiveDate}}',
    'p.otherLang': 'Tiếng Việt →',

    's1.h': '1. Who is responsible',
    's1.p': `<p>GoGo is a personal project with no registered company. The person responsible for your data is {{@legal.ownerName}}. Privacy questions go to <a href="${MAILTO}">{{@mail}}</a>.</p>`,

    's2.h': '2. What GoGo receives from you and from the app',
    's2.p': '<p>This list is complete: it is built from the app data table, where every row points at the code that sends it.</p>',
    's2.thWhat': 'Data',
    's2.thWhy': 'What it is for',
    's2.thNeed': 'Required?',
    's2.rows': [
      '          <tr><td>Email and password</td><td>Creating and signing in to an account</td><td>Required to register</td></tr>',
      '          <tr><td>Display name</td><td>Showing who you are inside a room</td><td>Required to register, and to join a room as a guest</td></tr>',
      '          <tr><td>Date of birth, avatar</td><td>Your profile</td><td>Optional</td></tr>',
      '          <tr><td>Room content: name, date and time, budget and how it is split, area, members, invites</td><td>The core function: agreeing on a place with your group</td><td>Required by the flow</td></tr>',
      '          <tr><td>Preferences, swipes, votes, itinerary edits</td><td>Matching the group and building the plan</td><td>Required by the flow</td></tr>',
      '          <tr><td>Saved items, notification settings</td><td>Your saved list; honouring what you chose to be notified about</td><td>Optional</td></tr>',
      '          <tr><td>Precise location — only when you choose “use my location”</td><td>Suggesting places near you; stored on the room as the starting point of the plan</td><td>Optional — you can pick an area by hand instead</td></tr>',
      '          <tr><td>What you type when searching for places</td><td>Search</td><td>Optional</td></tr>',
      '          <tr><td>Check-in photos (up to 3) and a bill photo; bill amount and number of people; rating, note, tags</td><td>A record of the outing, and splitting the bill</td><td>Optional</td></tr>',
      '          <tr><td>Place reviews: rating and text</td><td>Shown to other people after moderation</td><td>Optional</td></tr>',
      '          <tr><td>Place suggestions: the Google Maps link you paste, a note, category, moods, price range</td><td>Adding new places to GoGo, after moderation</td><td>Optional</td></tr>',
      '          <tr><td>The push-registration id and platform sent to GoGo servers; your user id and a short-lived ES256 token sent to OneSignal</td><td>Delivering notifications to the right person</td><td>Optional, follows the notification permission</td></tr>',
      '          <tr><td>Install and app-open events, with attribution parameters, sent to Tenjin</td><td>Measuring where an install came from, and opening deferred deep links</td><td>Optional</td></tr>',
      '          <tr><td>Crash and error reports and filtered breadcrumbs: your user id when signed in, otherwise an installation id; session release-health data including sid, an installation did, status, counters and seq</td><td>Fixing bugs and measuring how many sessions are crash-free</td><td>Depends on the build DSN</td></tr>',
    ].join('\n'),
    's2.not': '<p>GoGo does <strong>not</strong> send: contacts, calendar, messages, health data, payment details, passwords for other services, and it does not read your location while the app is in the background.</p>',
    's2.directions': '<p>Tapping “Directions” opens Google Maps with the destination address. You start that yourself and GoGo sends nothing more — but Google receives the address through your browser or Maps app.</p>',

    's3.h': '3. What the libraries inside the app collect on their own',
    's3.p': '<p>Four third-party libraries run inside the app and collect data by themselves, even where GoGo writes no code to send any:</p>',
    's3.onesignal': '<strong>OneSignal</strong> (push notifications) — per their documentation: operating system, language, timezone, country, app version, device model, package name, carrier, IP address, push token, plus session data and the notification permission state. GoGo does <strong>not</strong> enable the OneSignal location feature.',
    's3.tenjin': '<strong>Tenjin</strong> (install attribution) — per their documentation: device identifiers, IP address, device type and model, locale, country, platform and OS version, bundle id, SDK and app version, the Limit Ad Tracking setting, and Apple Search attribution if enabled. On Android the build declares the advertising-id permission and includes the App Set ID and the Play Install Referrer. On iOS there is <strong>no tracking prompt</strong>, so Tenjin does not receive the Apple advertising identifier; only the vendor identifier and the IP address.',
    's3.sentry': '<strong>Sentry</strong> (error reporting) — device, OS and app context attached by the SDK. The projects are configured <strong>not to store IP addresses</strong> and not to store a location inferred from one. No performance tracing, no session replay, no screenshots, and no view hierarchy.',
    's3.maps': '<strong>The Google Maps SDK</strong> (the in-app map, used on iOS as well as Android) — Google receives the API key, device and app information, the IP address, the requested map region and the coordinates of the pins, which are the places in your plan. The app turns off the part of the SDK that reads the device location.',

    's4.h': '4. Permissions the app asks for on your device',
    's4.list': [
      '        <li><strong>Location while using the app</strong> — to suggest places near you. Optional: you can pick an area by hand.</li>',
      '        <li><strong>Photo library</strong> — to add an avatar and check-in photos.</li>',
      '        <li><strong>Notifications</strong> — to tell you someone joined, a vote finished, or it is time to go.</li>',
    ].join('\n'),
    's4.not': '<p>The app does <strong>not</strong> ask for: background location, the camera, contacts, the calendar, or the microphone.</p>',

    's5.h': '5. Who receives your data',
    's5.list': [
      '        <li><strong>GoGo servers</strong> (<code>api-*.gogo.id.vn</code>) — where your account, rooms, plans and content live.</li>',
      '        <li><strong>OneSignal</strong> — delivers push notifications on behalf of GoGo.</li>',
      '        <li><strong>Tenjin</strong> — measures where an install came from. GoGo declares Tenjin a <strong>third party receiving shared data</strong> rather than a processor acting only for GoGo: it receives device identifiers and install or app-open events.</li>',
      '        <li><strong>Sentry</strong> — receives error reports and session data so GoGo can fix bugs.</li>',
      '        <li><strong>Google Maps Platform</strong> — draws the in-app map, and computes travel time: GoGo servers send the starting point you chose along with the coordinates of the stops.</li>',
    ].join('\n'),
    's5.hosting': '<p>The infrastructure GoGo runs on processes data for GoGo too: the PostgreSQL database at Neon, the Redis cache at Upstash, images and files at Cloudflare R2, and Cloudflare for the edge network. Secrets live in AWS SSM and contain no personal data.</p>',

    's6.h': '6. How long it is kept',
    's6.list': [
      '        <li>Account data: as long as the account exists, then as section 8 describes.</li>',
      '        <li><strong>Precise starting-point coordinates: deleted 30 days after the room ends.</strong> An address you typed yourself stays.</li>',
      '        <li>The text you type when searching: 90 days (after that only the counts remain).</li>',
      '        <li>Sign-in attempt records: 30 days.</li>',
      '        <li>Guest sessions that were never registered: revoked and anonymized 7 days after they expire.</li>',
      '        <li>An export file you asked for: deleted 24 hours after it is ready, and downloadable once.</li>',
      '        <li>The record of a privacy request: {{@legal.ledgerRetentionMonths}} months after it closes, as evidence it was handled.</li>',
      '        <li>A job runs daily to carry the above out.</li>',
    ].join('\n'),

    's7.h': '7. Security',
    's7.p': '<p>Passwords are not stored in a readable form: GoGo stores an Argon2id hash. The signed-in session on your device sits in the iOS Keychain or the Android Keystore.</p>',

    's8.h': '8. Your rights',
    's8.list': [
      '        <li><strong>Export your data</strong> — in the app: Profile → ⚙️ Account → Your data → Export my data (up to 3 times an hour). The file can only be downloaded from your own session, which is why GoGo does not email it.</li>',
      '        <li><strong>Delete your account</strong> — in the app: Profile → ⚙️ Account → Delete account. If you cannot open the app, see the <a href="{{@link.deleteData}}">data deletion page</a>.</li>',
      '        <li><strong>Correct your data</strong> — edit your profile in the app; optional fields can be left empty.</li>',
      '        <li><strong>Withdraw a permission</strong> — location, photos and notifications can be turned off in your device settings; the notification switch is in the app as well.</li>',
      `        <li><strong>Anything else</strong> — write to <a href="${MAILTO}">{{@mail}}</a>; the request is recorded as section 6 describes.</li>`,
    ].join('\n'),

    's9.h': '9. This website',
    's9.p': '<p>gogo.id.vn is a static site on Cloudflare Workers. It <strong>sets no cookies, has no analytics, no tracking scripts, and loads nothing from anyone else servers</strong> — the webfont is served from this domain. The Vietnamese home page carries one small inline script that reads the URL only, to send old <code>?lang=en</code> links to the English version. Cloudflare processes IP addresses and request data to serve and protect the site, and may set a technical cookie when it shows a security check.</p>',

    's10.h': '10. When this policy changes',
    's10.p': '<p>A new version is posted at this address with a new effective date. GoGo has no in-app or email notice mechanism, so it does not promise one. The full revision history is public: <a href="https://github.com/namnh92/GoGo-FE/commits/master/src/strings/privacy.mjs">the history of this page on GitHub</a>.</p>',

    's11.h': '11. Contact',
    's11.p': `<p>Email: <a href="${MAILTO}">{{@mail}}</a>.</p>`,
  },
};