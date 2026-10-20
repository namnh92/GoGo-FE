# GoGo-FE

Landing page giới thiệu sản phẩm GoGo VN + mục kêu gọi đầu tư — trang tĩnh, không build step. VI mặc định, EN qua nút chuyển (hoặc `?lang=en`).

- Mã nguồn: `site/index.html`; ảnh màn hình app: `site/img/` (chụp từ bản thử nghiệm, nguồn `dev/test-evidence/`, đã downscale 1000px)
- Hosting: Cloudflare Workers static assets, Worker `gogo-landing` (`wrangler.jsonc`)
- URL: https://gogo.id.vn, https://www.gogo.id.vn (custom domain; workers.dev tắt)

## Cấu trúc

- `src/template.html` + `src/strings.mjs` → `node build.mjs` sinh `site/index.html` (VI) và
  `site/en/index.html` (EN). **Không sửa trực tiếp file trong `site/*.html`.**
- `node build.mjs --check` báo lỗi nếu trang đã commit lệch nguồn, thiếu/thừa chuỗi, hoặc hai
  ngôn ngữ khác bộ khoá.
- Ảnh app: `site/img/*.png` — chụp 2026-10-13 trên iOS simulator (iPhone 17) từ GoGo-MobileApp
  `develop` 63aa2e0 nối DEV, phòng demo "Chủ nhật dạo phố"; bản gốc 1206×2622 trong
  `dev/test-evidence/fe-shots-2026-10-13/` của workspace, downscale `sips -Z 1000`.
- Ảnh địa điểm thấy trong ảnh app: Wikimedia Commons, giấy phép mở, gắn vào place trên DEV qua
  CMS (attribution lưu ở media). Ảnh nào hiện trong screenshot thì phải ghi nguồn ở footer
  (`foot.photo` + `.credits`): Tràng Tiền Plaza (The Hanoian, CC BY-SA 4.0) và Bảo tàng Phụ nữ Việt Nam
  (Aumusee, CC BY-SA 3.0). Ảnh ở Kết quả / Lịch trình / Đang đi chơi cần GoGo-MobileApp#334
  (merged develop d3e2ab7); ảnh chụp từ Metro ở ac3bc6f.
- Logo công nghệ: `site/img/logos/`, danh sách ở `STACK` trong `build.mjs`. Nguồn: simple-icons 16.35.0 (CC0),
  devicon 2.17.0 (AWS, MIT), trang chính chủ (OneSignal favicon.svg, Tenjin logo SVG trong header tenjin.com,
  Adjust logo trắng trên adjust.com). Logo là thương hiệu của chủ sở hữu tương ứng.
- Nháp chính sách chưa có hiệu lực: `docs/drafts/` (không deploy).
- Nội dung chỉ ghi điều đã xác nhận: không founder, số liệu, pháp nhân, đối tác chưa được owner chốt.

## Preview & deploy

```bash
node build.mjs && npx wrangler@4 dev --port 8788
```

```bash
node build.mjs --check && npx wrangler@4 deploy
```

