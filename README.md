# GoGo-FE

Landing page giới thiệu sản phẩm GoGo VN + mục kêu gọi đầu tư — trang tĩnh, không build step. VI mặc định, EN qua nút chuyển (hoặc `?lang=en`).

- Mã nguồn: `site/index.html`; ảnh màn hình app: `site/img/` (chụp từ bản thử nghiệm, nguồn `dev/test-evidence/`, đã downscale 1000px)
- Hosting: Cloudflare Workers static assets, Worker `gogo-landing` (`wrangler.jsonc`)
- URL: https://gogo.id.vn, https://www.gogo.id.vn (custom domain; workers.dev tắt)

## Cấu trúc

- `src/pages/<trang>.html` (phần thân riêng của trang) + `src/partials/*` (chrome dùng chung:
  `head.html`, `header.html`, `footer.html`, `base.css`) + `src/strings/<trang>.mjs` →
  `node build.mjs` sinh một file cho mỗi trang × mỗi ngôn ngữ, theo bảng `PAGES` trong
  `build.mjs`. **Không sửa trực tiếp file trong `site/**/*.html`.**
- Thêm một trang = một hàng trong `PAGES` + một file thân + một file chuỗi. Chrome không chép lại.
- `{{>tên}}` nhúng `src/partials/tên`; `{{khoá}}` là chuỗi; `{{@tên}}` là giá trị tính trong
  `build.mjs` (`canonical`, `langSwitch`, …).
- `node build.mjs --check` báo lỗi nếu: trang đã commit lệch nguồn · hai ngôn ngữ khác bộ khoá
  (theo **từng** file chuỗi) · một chuỗi của trang không được trang đó dùng · một chuỗi trong
  `shared.mjs` không được **mọi** trang dùng · một khoá khai cả ở `shared` và ở file trang · thiếu
  partial · có file `site/**/*.html` mà không hàng `PAGES` nào sinh ra · trang tham chiếu script
  hay stylesheet của origin khác (Invariant C bên dưới).
- Ảnh app: `site/img/*.png` — chụp 2026-10-13 trên iOS simulator (iPhone 17) từ GoGo-MobileApp
  `develop` 63aa2e0 nối DEV, phòng demo "Chủ nhật dạo phố"; bản gốc 1206×2622 trong
  `dev/test-evidence/fe-shots-2026-10-13/` của workspace, downscale `sips -Z 1000`.
- Ảnh địa điểm thấy trong ảnh app: Wikimedia Commons, giấy phép mở, gắn vào place trên DEV qua
  CMS (attribution lưu ở media). Ảnh nào hiện trong screenshot thì phải ghi nguồn ở footer
  (`foot.photo` + `.credits`): Tràng Tiền Plaza (The Hanoian, CC BY-SA 4.0) và Bảo tàng Phụ nữ Việt Nam
  (Aumusee, CC BY-SA 3.0). Ảnh ở Kết quả / Lịch trình / Đang đi chơi cần GoGo-MobileApp#334
  (merged develop d3e2ab7); ảnh chụp từ Metro ở ac3bc6f.
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

## Phông chữ tự host (#4)

Trang **không** nạp gì từ origin khác. Trước đây mỗi lượt mở trang gửi IP + User-Agent của khách
tới Google Fonts; `build.mjs` giờ thả lỗi nếu một output có `<script src>`, `<link rel=stylesheet>`,
`preconnect`, `dns-prefetch`, `preload` hay `@import` trỏ ra ngoài (`canonical` và `alternate` là
metadata, không bị chặn).

Be Vietnam Pro 400–800, ba subset như Google phục vụ, tải từ `https://fonts.gstatic.com/s/bevietnampro/v12/`:

| File | Weight | Subset | Bytes | sha256 |
| --- | --- | --- | --- | --- |
| `be-vietnam-pro-400-vietnamese.woff2` | 400 | vietnamese | 4720 | `b0d9b8aec7f47207ce4065be34286203e0741c8329be6d05986b149f991f84c1` |
| `be-vietnam-pro-400-latin-ext.woff2` | 400 | latin-ext | 6880 | `c2ae124f149371e1b6209cbba234852310caeee3c32990a56ccb93ac1c7edb9a` |
| `be-vietnam-pro-400-latin.woff2` | 400 | latin | 12908 | `d25f70ff7404fddbeb150c9c687bf37069468a5cdf59117b2a30226d1ebfa5c0` |
| `be-vietnam-pro-500-vietnamese.woff2` | 500 | vietnamese | 5100 | `e83829fe40a88cff1c6ee213801661468bfed922771d1c382b4c1fdc269a5648` |
| `be-vietnam-pro-500-latin-ext.woff2` | 500 | latin-ext | 7184 | `83b86791eb0ebfca23daa3f70ee179f13638c69441b69a6d2deb6b96a95385ea` |
| `be-vietnam-pro-500-latin.woff2` | 500 | latin | 13324 | `0336df67f25be86ea38a6f37b11ffb4901c1ed65ce06ba99d6a304913e997e52` |
| `be-vietnam-pro-600-vietnamese.woff2` | 600 | vietnamese | 5124 | `843908240371827470dd178e284ffbbeb85f1563bf47e5b9c9db58526fb7f6e0` |
| `be-vietnam-pro-600-latin-ext.woff2` | 600 | latin-ext | 7152 | `90c10a1f4fdd8aa634b70bfc22ca991f12bba15b1661ea2390443e31888e1f5b` |
| `be-vietnam-pro-600-latin.woff2` | 600 | latin | 13428 | `14950d0af319bbc1f7a26ed08bf1ba7a9e18324111056bb0c81eef0983a931c0` |
| `be-vietnam-pro-700-vietnamese.woff2` | 700 | vietnamese | 5132 | `141f6c45010274d7d3625d0554476ec1161274d9eb09a38135977ea1b2b84895` |
| `be-vietnam-pro-700-latin-ext.woff2` | 700 | latin-ext | 7164 | `f446d28e986c5695283afcb13a7719dabd9f2cec28ab49ecb43a328efa009f05` |
| `be-vietnam-pro-700-latin.woff2` | 700 | latin | 13348 | `cf841d2b615f068e77a918114f44c17d51d0b73314fdff81eae95f528387c391` |
| `be-vietnam-pro-800-vietnamese.woff2` | 800 | vietnamese | 5144 | `58a2faf88435a23f137b8221310009fca88a5a8e828a7626561168ac94913de1` |
| `be-vietnam-pro-800-latin-ext.woff2` | 800 | latin-ext | 7144 | `c7266fff4717df8e9c25398fd6c37fa3ad385bead8f505bf00105c54524c6712` |
| `be-vietnam-pro-800-latin.woff2` | 800 | latin | 13380 | `8a5b5841729c2ed690748ab243602bd45205575a5f58fe0c1fef04d79a912276` |

Licence đi kèm file: `site/fonts/OFL.txt` (SIL OFL 1.1 — bắt buộc khi phát hành lại).
