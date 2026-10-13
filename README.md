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
- Ảnh app: `site/img/*.png` — chụp từ bản thử nghiệm (`dev/test-evidence/` của workspace).
- Logo công nghệ: `site/img/logos/` — Claude từ simple-icons 13.21.0 (CC0); Cloudflare, AWS,
  Google Cloud từ devicon 2.16.0 (MIT). Logo là thương hiệu của chủ sở hữu tương ứng.
- Nháp chính sách chưa có hiệu lực: `docs/drafts/` (không deploy).
- Nội dung chỉ ghi điều đã xác nhận: không founder, số liệu, pháp nhân, đối tác chưa được owner chốt.

## Preview & deploy

```bash
node build.mjs && npx wrangler@4 dev --port 8788
```

```bash
node build.mjs --check && npx wrangler@4 deploy
```

