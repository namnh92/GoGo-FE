# GoGo-FE

Landing page "Sắp ra mắt" của GoGo — trang tĩnh, không build step.

- Mã nguồn: `site/index.html`
- Hosting: Cloudflare Workers static assets, Worker `gogo-landing` (`wrangler.jsonc`)
- URL: https://gogo.id.vn, https://www.gogo.id.vn (custom domain; workers.dev tắt)

## Deploy

```bash
npx wrangler@4 deploy
```
