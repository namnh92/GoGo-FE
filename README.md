# GoGo-FE

Landing page "Sắp ra mắt" của GoGo — trang tĩnh, không build step.

- Mã nguồn: `site/index.html`
- Hosting: Cloudflare Pages, project `gogo-landing` (production branch `master`)

## Deploy

```bash
npx wrangler@4 pages deploy site --project-name gogo-landing --branch master
```

`--branch master` bắt buộc để cập nhật bản production (`gogo-landing.pages.dev`);
nhánh khác chỉ tạo preview URL.
