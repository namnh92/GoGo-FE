// Data deletion page (`/xoa-du-lieu/`, `/en/delete-my-data/`).
//
// Google Play requires a web URL where someone can ask for account and data deletion, separate from
// the in-app path. The in-app path is still the fast one and is named first; this page exists for
// people who cannot open the app.
//
// Same rule as the privacy page: every clause carries its source, and a clause with no source is
// dropped. The removed/kept lists are ADR-0023 (GoGo-BE/docs/adr/0023-account-deletion-policy.md),
// which the app already prints in its own confirmation dialog — the two must not diverge.
//
// No form: the site is static assets with no backend, and a form posting to a Worker would add a
// runtime and a second place personal data lands, for the same outcome as an email.
import { MAIL } from './shared.mjs';

const MAILTO = `mailto:${MAIL}`;
const mailDelete = (subject, lines) => `${MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;

export const deleteData = {
  vi: {
      // Required page key: the footer renders it on every page. The photo credit belongs to the
      // landing page, which is where the photos are.
      'foot.credits': '',
    'a.title': 'Xoá tài khoản GoGo và dữ liệu của bạn',
    'a.desc': 'Cách xoá tài khoản GoGo: trong ứng dụng, hoặc bằng email nếu bạn không mở được ứng dụng. Điều gì bị xoá, điều gì còn lại, và trong bao lâu.',
    'a.ogDesc': 'Cách xoá tài khoản GoGo và dữ liệu cá nhân: trong ứng dụng hoặc bằng email.',
    'a.mailDelete': mailDelete('Yêu cầu xoá tài khoản GoGo và dữ liệu cá nhân', 'Email đã đăng ký của tôi: \n\nTôi yêu cầu xoá tài khoản GoGo và dữ liệu cá nhân của tôi.\n\nTôi hiểu rằng đánh giá tôi đã viết và ảnh tôi đã góp cho địa điểm vẫn ở lại GoGo, nhưng không còn hiện tên tôi.\n\nTên hiển thị trong ứng dụng (nếu nhớ): '),

    'd.h1': 'Xoá tài khoản GoGo và dữ liệu của bạn',
    'd.lead': 'Trang này dành cho tài khoản của ứng dụng GoGo — nhất là khi bạn không mở được ứng dụng nữa.',
    'd.otherLang': 'English →',

    // S-8: nhãn thật trong ứng dụng (GoGo-MobileApp vi.ts: tabs.profile, profile.settings.account,
    // account.title, account.deleteConfirm).
    's1.h': '1. Nhanh nhất: xoá trong ứng dụng',
    's1.p': '<p>Mở GoGo → <strong>Cá nhân</strong> → <strong>⚙️ Tài khoản</strong> → <strong>Xoá tài khoản</strong>, rồi xác nhận. Việc xoá chạy ngay, bạn không phải chờ ai trả lời.</p>',

    // D-9.2: email + ba dòng nội dung; mẫu mailto theo đúng cách trang chủ đang dùng.
    's2.h': '2. Không mở được ứng dụng: gửi email',
    's2.p': `<p>Gửi email từ <strong>chính địa chỉ email bạn đã đăng ký</strong> tới <a href="${MAILTO}">{{@mail}}</a>. Nút dưới đây mở sẵn thư với tiêu đề và nội dung; bạn chỉ cần điền email đã đăng ký rồi gửi.</p>`,
    's2.cta': 'Mở thư yêu cầu xoá',
    's2.body': '<p><strong>Nội dung thư cần có:</strong></p><ul><li>địa chỉ email bạn đã đăng ký với GoGo;</li><li>câu yêu cầu xoá tài khoản và dữ liệu cá nhân;</li><li>xác nhận rằng bạn hiểu đánh giá và ảnh đã góp vẫn ở lại GoGo mà không hiện tên bạn;</li><li>nếu nhớ: tên hiển thị của bạn trong ứng dụng.</li></ul>',

    // D-9.3 + ADR-0011: identity_status matched / unverified; outcome identity_not_verified.
    's3.h': '3. GoGo xác minh thế nào',
    's3.p': '<p>Nếu thư gửi từ đúng địa chỉ email của tài khoản, yêu cầu được xử lý. Nếu gửi từ địa chỉ khác, GoGo <strong>không xoá gì cả</strong> — yêu cầu được ghi nhận là chưa xác minh được danh tính và thư trả lời sẽ nói rõ như vậy, kèm hướng dẫn đặt lại mật khẩu để bạn tự xoá trong ứng dụng. GoGo không nhận hình thức chứng minh danh tính nào khác, vì không có cách kiểm tra chúng.</p>',

    // S-6: ADR-0023 — hai nửa "removed"/"kept", đúng như hộp thoại trong ứng dụng.
    's4.h': '4. Điều gì bị xoá, điều gì còn lại',
    's4.removedH': 'Bị xoá',
    's4.removed': '<ul><li>đường đăng nhập: email và mật khẩu;</li><li>mọi phiên đăng nhập và mọi đăng ký nhận thông báo của thiết bị;</li><li>tên hiển thị, ảnh đại diện, khu vực mặc định, ngân sách thường dùng, ngày sinh, sở thích;</li><li>mục đã lưu, thông báo và cài đặt thông báo;</li><li>tên bạn trên các phòng từng tham gia được thay bằng một nhãn ẩn danh.</li></ul>',
    's4.keptH': 'Còn lại, có chủ ý',
    's4.kept': '<ul><li>một bản ghi kỹ thuật của tài khoản và id của nó, để các liên kết dữ liệu không vỡ và id không bị cấp lại cho người khác;</li><li>đánh giá bạn đã viết;</li><li>ảnh bạn đã góp cho địa điểm.</li></ul><p>Hai thứ cuối là nội dung bạn đã góp cho người khác đọc, nên chúng ở lại — nhưng không còn hiện tên bạn.</p>',
    // ADR-0023 amendment: thu hồi tệp export đang chờ.
    's4.irreversible': '<p>Việc xoá <strong>không thể hoàn tác</strong>. Nếu bạn vừa yêu cầu xuất dữ liệu mà chưa tải, tệp đó cũng bị thu hồi.</p>',

    // P-6: GoGo không với tay vào hệ thống của nhà cung cấp.
    's5.h': '5. Dữ liệu đã nằm ở nhà cung cấp',
    's5.p': '<p>Sau khi xoá, GoGo không gửi thông báo cho bạn nữa vì đăng ký nhận thông báo đã bị bỏ. Nhưng dữ liệu mà OneSignal, Tenjin hoặc Sentry <strong>đã nhận trước đó</strong> nằm trong hệ thống của họ và theo chính sách của họ — GoGo không xoá hộ bạn ở phía đó.</p>',

    // S-9: ADR-0011 — hồ sơ yêu cầu sống lâu hơn tài khoản, có chủ ý.
    's6.h': '6. Hồ sơ của yêu cầu',
    's6.p': '<p>GoGo giữ một hồ sơ của chính yêu cầu này — loại yêu cầu, thời điểm, địa chỉ email bạn gửi từ đó, và kết quả — trong {{@legal.ledgerRetentionMonths}} tháng sau khi đóng, làm bằng chứng rằng yêu cầu đã được xử lý. Hồ sơ đó sống lâu hơn tài khoản, có chủ ý, và không chứa dữ liệu đã xuất của bạn.</p>',

    's7.h': '7. Bao lâu',
    's7.p': '<p>GoGo xác nhận đã nhận trong vòng {{@legal.ackWithinHours}} giờ và hoàn tất trong vòng {{@legal.completeWithinDays}} ngày, rồi trả lời vào đúng địa chỉ email đã gửi yêu cầu.</p>',

    // S-7: phiên khách bị thu hồi + ẩn danh 7 ngày sau hết hạn (privacy-jobs.ts:99-115).
    's8.h': '8. Nếu bạn vào phòng với tư cách khách',
    's8.p': '<p>Khách không có tài khoản. Phiên của khách tự bị thu hồi và ẩn danh 7 ngày sau khi hết hạn, nên không có gì để yêu cầu.</p>',

    // S-10: ADR-0033 — tệp export chỉ đổi được từ phiên của chính chủ, không gửi qua email.
    's9.h': '9. Nếu bạn muốn lấy dữ liệu trước khi xoá',
    's9.p': '<p>Xuất dữ liệu chỉ làm được <strong>trong ứng dụng</strong>: Cá nhân → ⚙️ Tài khoản → Dữ liệu của bạn → Xuất dữ liệu. Tệp chỉ tải được từ phiên của chính bạn và GoGo không gửi nó qua email — đó là lý do trang này chỉ nhận yêu cầu xoá.</p>',

    's10.p': `<p>Xem thêm: <a href="{{@link.privacy}}">Chính sách quyền riêng tư</a>. Câu hỏi khác: <a href="${MAILTO}">{{@mail}}</a>.</p>`,
  },

  en: {
      // Required page key: the footer renders it on every page. The photo credit belongs to the
      // landing page, which is where the photos are.
      'foot.credits': '',
    'a.title': 'Delete your GoGo account and data',
    'a.desc': 'How to delete a GoGo account: in the app, or by email if you cannot open the app. What is removed, what stays, and how long it takes.',
    'a.ogDesc': 'How to delete your GoGo account and personal data: in the app or by email.',
    'a.mailDelete': mailDelete('Request to delete my GoGo account and personal data', 'My registered email address: \n\nI am asking you to delete my GoGo account and my personal data.\n\nI understand that reviews I wrote and photos I contributed to places stay on GoGo, but no longer show my name.\n\nMy display name in the app (if I remember it): '),

    'd.h1': 'Delete your GoGo account and data',
    'd.lead': 'This page is for GoGo app accounts — above all when you can no longer open the app.',
    'd.otherLang': 'Tiếng Việt →',

    's1.h': '1. Fastest: delete it in the app',
    's1.p': '<p>Open GoGo → <strong>Profile</strong> → <strong>⚙️ Account</strong> → <strong>Delete account</strong>, then confirm. It runs immediately; you do not wait for anyone to reply.</p>',

    's2.h': '2. If you cannot open the app: send an email',
    's2.p': `<p>Write from <strong>the email address you registered with</strong> to <a href="${MAILTO}">{{@mail}}</a>. The button below opens a message with the subject and body ready; fill in your registered address and send it.</p>`,
    's2.cta': 'Open the deletion request',
    's2.body': '<p><strong>What the message needs to say:</strong></p><ul><li>the email address you registered with;</li><li>that you are asking for your account and personal data to be deleted;</li><li>that you understand reviews and contributed photos stay on GoGo without your name;</li><li>if you remember it: your display name in the app.</li></ul>',

    's3.h': '3. How GoGo verifies it is you',
    's3.p': '<p>If the message comes from the account email address, the request is processed. If it comes from another address, GoGo <strong>deletes nothing</strong> — the request is recorded as not identity-verified and the reply says so, with instructions to reset your password and delete the account in the app. GoGo accepts no other form of proof, because there is no way to check one.</p>',

    's4.h': '4. What is removed and what stays',
    's4.removedH': 'Removed',
    's4.removed': '<ul><li>the way in: your email address and password;</li><li>every session and every device push registration;</li><li>display name, avatar, home area, usual budget, date of birth, interests;</li><li>saved items, notifications and notification settings;</li><li>your name on rooms you took part in, replaced by a fixed anonymous label.</li></ul>',
    's4.keptH': 'Kept, deliberately',
    's4.kept': '<ul><li>the technical account record and its id, so data links do not break and the id is never reissued to someone else;</li><li>reviews you wrote;</li><li>photos you contributed to places.</li></ul><p>The last two are content you contributed for other people to read, so they stay — without your name on them.</p>',
    's4.irreversible': '<p>Deletion <strong>cannot be undone</strong>. If you asked for a data export and have not downloaded it, that file is revoked too.</p>',

    's5.h': '5. Data already held by providers',
    's5.p': '<p>After deletion GoGo no longer sends you notifications, because the push registrations are gone. But data OneSignal, Tenjin or Sentry <strong>already received</strong> sits in their systems under their policies — GoGo does not delete it there on your behalf.</p>',

    's6.h': '6. The record of your request',
    's6.p': '<p>GoGo keeps a record of the request itself — its type, the dates, the email address you wrote from, and the outcome — for {{@legal.ledgerRetentionMonths}} months after it closes, as evidence that it was handled. That record deliberately outlives the account, and it never contains your exported data.</p>',

    's7.h': '7. How long it takes',
    's7.p': '<p>GoGo acknowledges the request within {{@legal.ackWithinHours}} hours and completes it within {{@legal.completeWithinDays}} days, then replies to the same address the request came from.</p>',

    's8.h': '8. If you joined a room as a guest',
    's8.p': '<p>A guest has no account. A guest session is revoked and anonymized automatically 7 days after it expires, so there is nothing to request.</p>',

    's9.h': '9. If you want your data before deleting',
    's9.p': '<p>Exporting is only possible <strong>in the app</strong>: Profile → ⚙️ Account → Your data → Export my data. The file can only be downloaded from your own session and GoGo does not email it — which is why this page only takes deletion requests.</p>',

    's10.p': `<p>See also: <a href="{{@link.privacy}}">the privacy policy</a>. Anything else: <a href="${MAILTO}">{{@mail}}</a>.</p>`,
  },
};
