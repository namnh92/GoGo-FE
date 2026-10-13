# GoGo-FE

Landing page giới thiệu sản phẩm GoGo VN + mục kêu gọi đầu tư — trang tĩnh, không build step. VI mặc định, EN qua nút chuyển (hoặc `?lang=en`).

- Mã nguồn: `site/index.html`; ảnh màn hình app: `site/img/` (chụp từ bản thử nghiệm, nguồn `dev/test-evidence/`, đã downscale 1000px)
- Hosting: Cloudflare Workers static assets, Worker `gogo-landing` (`wrangler.jsonc`)
- URL: https://gogo.id.vn, https://www.gogo.id.vn (custom domain; workers.dev tắt)

## Deploy

```bash
npx wrangler@4 deploy
```
