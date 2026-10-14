# Chính sách quyền riêng tư — BẢN NHÁP, CHƯA CÓ HIỆU LỰC

> Không xuất bản. Không nằm trong `site/`. Cần owner xác nhận từng mục đánh dấu **[CẦN XÁC NHẬN]**
> trước khi đưa lên gogo.id.vn. Nội dung dưới đây chỉ ghi những gì đã có bằng chứng trong code/ADR
> (nguồn ghi bên cạnh); không phải tư vấn pháp lý.

## 1. Ai vận hành
- GoGo VN là dự án startup Việt Nam, **chưa có pháp nhân**. **[CẦN XÁC NHẬN]** người/đơn vị chịu
  trách nhiệm dữ liệu, địa chỉ liên hệ pháp lý.
- Liên hệ: namnh@gogo.id.vn.

## 2. Dữ liệu thu thập (theo code hiện tại) **[CẦN XÁC NHẬN đầy đủ danh sách]**
- Tài khoản: email, mật khẩu (băm), tên hiển thị, ảnh đại diện, khu vực, ngân sách thường dùng,
  ngày sinh (tuỳ chọn), sở thích.
- Phòng/kèo: thành viên, sở thích, bình chọn, kế hoạch, đánh giá, ảnh đóng góp cho địa điểm.
- Vị trí xuất phát: dùng để gợi ý; vị trí chính xác chỉ lưu có thời hạn (job `clearExpiredOrigins`).
  **[CẦN XÁC NHẬN thời hạn cụ thể để công bố]**
- Thiết bị: token thông báo đẩy (OneSignal), dữ liệu attribution (Tenjin). **[CẦN XÁC NHẬN]**

## 3. Bên thứ ba xử lý dữ liệu **[CẦN XÁC NHẬN + DPA]**
Google Maps Platform (bản đồ, địa điểm, chỉ đường), OneSignal (thông báo đẩy), Tenjin (attribution),
Cloudflare (CDN, Workers, Access), Neon (PostgreSQL), Upstash (Redis), AWS SSM (cấu hình bí mật).

## 4. Xoá tài khoản (GoGo-BE ADR-0023)
Xoá trong ứng dụng là **xoá mềm có danh sách giữ lại**:
- Xoá/vô hiệu: đăng nhập (email, mật khẩu), phiên, token thiết bị, hồ sơ cá nhân, ảnh đại diện,
  mục đã lưu, thông báo, tuỳ chọn thông báo; tên trên thành viên phòng được ẩn danh.
- **Giữ lại**: bản ghi kỹ thuật của tài khoản (id), đánh giá đã viết, ảnh đã đóng góp cho địa điểm.
- Chưa có trang web để yêu cầu xoá mà không cần cài app (Google Play yêu cầu). **[CẦN QUYẾT ĐỊNH]**

## 5. Chưa có / chưa công bố được
- Thời hạn lưu từng loại dữ liệu, cơ sở pháp lý xử lý (Nghị định 13/2023/NĐ-CP), quy trình
  yêu cầu truy cập/xuất dữ liệu, chính sách trẻ em, điều khoản sử dụng.
