# ❄ Defrosting

Blog nghiên cứu & portfolio cá nhân về AI trong khoa Phụ sản, các khoa khác trong bệnh viện,
và hướng đổi mới cho hệ thống y tế Việt Nam.

**Địa chỉ:** https://hawey2.github.io/Defrosting.github.io/

- ✍️ Cách đăng bài, chèn ảnh, thêm dự án: xem **[HUONG-DAN-DANG-BAI.md](HUONG-DAN-DANG-BAI.md)**
- 🛠 Công nghệ: Jekyll 4, build & deploy bằng GitHub Actions (`.github/workflows/pages.yml`)

## Cấu trúc

```
_posts/            bài viết (Markdown)
_portfolio/        dự án trong Portfolio
assets/images/     ảnh (posts/, portfolio/)
_config.yml        tên blog, thông tin tác giả
_layouts/          khung trang: default, page, post, project
_includes/         mảnh dùng lại: entry (dự án), post-row, figure, seal, brush…
_sass/             CSS chia theo lớp (xem dưới)
assets/js/site.js  menu, sáng/tối, mục lục, đánh số hình, lightbox, hiệu ứng hiện dần
```

## Hệ thống giao diện (phong cách tranh lụa)

CSS đi theo một chiều, lớp sau chỉ dùng biến của lớp trước:

| Lớp | File | Vai trò |
|---|---|---|
| Tokens | `_sass/_tokens.scss` | Màu, font, khoảng cách, chế độ tối. **Muốn đổi màu, chỉ sửa ở đây.** |
| Base | `_sass/_base.scss` | Chữ, liên kết, nút |
| Silk | `_sass/_silk.scss` | Chất liệu lụa: thớ lụa, màu loang, ấn son, nét bút lông, khung bồi tranh |
| Layout | `_sass/_layout.scss` | Header, hero (tranh treo dọc), footer |
| Index | `_sass/_index.scss` | Danh mục dự án kiểu sổ triển lãm, dải ảnh căn đều, danh sách bài |
| Article | `_sass/_article.scss` | Nội dung bài, hình, mục lục, callout |
| Lightbox | `_sass/_lightbox.scss` | Xem ảnh lớn |

Tranh minh hoạ mẫu (`hero-silk.svg`, ảnh portfolio) là SVG vẽ bằng lớp màu trong suốt + bộ lọc loang mực, nên sắc nét ở mọi kích thước.

## Bật GitHub Pages (làm một lần)

Settings → Pages → **Build and deployment → Source: GitHub Actions**.

Và đặt nhánh mặc định là `main` (Settings → General → Default branch), vì môi trường `github-pages` chỉ cho phép deploy từ nhánh mặc định.
