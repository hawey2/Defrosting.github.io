# Hướng dẫn đăng bài lên Defrosting

Bạn không cần cài gì trên máy. Mọi thao tác đều làm được ngay trên github.com.
Sau mỗi lần lưu (commit) vào nhánh `main`, trang tự cập nhật sau khoảng 1–2 phút
(xem tiến trình ở tab **Actions** của repo).

## 1. Thêm ảnh

1. Mở thư mục `assets/images/posts/` trên github.com.
2. Bấm **Add file → Upload files**, kéo thả ảnh vào rồi bấm **Commit changes**.
   (Muốn gom ảnh theo bài thì cứ đặt tên có tiền tố, ví dụ `ctg-so-do-1.jpg`, `ctg-so-do-2.jpg`.)
3. Đặt tên file **không dấu, không khoảng trắng**: `so-do-ctg.jpg`, không phải `Sơ đồ CTG.jpg`.

**Gợi ý cho ảnh độ phân giải cao**

| Loại ảnh | Định dạng | Kích thước gợi ý |
|---|---|---|
| Sơ đồ, hình vẽ vector | `.svg` (sắc nét ở mọi mức phóng) | — |
| Ảnh chụp, minh hoạ màu | `.webp` hoặc `.jpg` chất lượng 80–85 | cạnh dài ~2400 px, < 1.5 MB |
| Sơ đồ có chữ nhỏ, xuất từ Figma/PowerPoint | `.png` hoặc `.webp` | xuất ở 2x |

Ảnh to hơn vẫn hiển thị được, nhưng trang sẽ tải chậm. Người đọc luôn có thể
bấm vào ảnh để phóng to, bấm thêm lần nữa để xem đúng 100% kích thước gốc.
Nếu muốn có bản gốc cực lớn, hãy dùng ảnh nhẹ để hiển thị và thêm bản lớn qua
`data-full` (xem mục 4).

## 2. Tạo bài viết

Vào thư mục `_posts/` → **Add file → Create new file**. Tên file **bắt buộc** có dạng:

```
NĂM-THÁNG-NGÀY-ten-bai-khong-dau.md
ví dụ: 2026-12-01-ai-trong-giai-phau-benh.md
```

Nội dung mẫu (copy rồi sửa):

```markdown
---
title: "AI trong giải phẫu bệnh: đọc tiêu bản số"
description: "Một câu tóm tắt, hiện dưới tiêu đề và trên thẻ bài viết."
tags: [Giải phẫu bệnh, Nhập môn]
cover: /assets/images/posts/giai-phau-benh/cover.jpg      # (không bắt buộc)
cover_caption: "Chú thích ảnh bìa"                         # (không bắt buộc)
references:                                                # (không bắt buộc)
  - "Tác giả (2024). *Tên bài báo.* Tạp chí."
---

Đoạn mở đầu…

## Tiêu đề mục (sẽ tự vào Mục lục)

Nội dung…
```

## 3. Chèn ảnh — cách đơn giản nhất

```markdown
![Mô tả ảnh cho người dùng trình đọc màn hình](/assets/images/posts/giai-phau-benh/so-do.jpg "Chú thích hiện dưới ảnh")
```

- Ảnh phải nằm **riêng một dòng** (có dòng trống trước và sau).
- Phần trong ngoặc kép là **chú thích**; blog tự đánh số *Hình 1, Hình 2…*
- Muốn ảnh **rộng hơn cột chữ**, thêm `{: .wide}` ngay sau (hoặc `{: .full}` để gần tràn màn hình):

```markdown
![Mô tả](/assets/images/posts/giai-phau-benh/so-do.jpg "Chú thích"){: .wide}
```

Đường dẫn luôn bắt đầu bằng `/assets/...` — blog tự xử lý phần `/Defrosting`.

## 4. Chèn ảnh — cách đầy đủ (có ghi nguồn)

```liquid
{% include figure.html
   src="/assets/images/posts/giai-phau-benh/so-do.jpg"
   alt="Mô tả ảnh"
   caption="Chú thích, hỗ trợ **markdown**"
   credit="Tên tác giả / nguồn"
   size="wide" %}
```

`size` có thể bỏ trống, hoặc `wide`, `full`.

Ảnh rất lớn: dùng HTML để hiển thị bản nhẹ nhưng mở bản gốc khi phóng to:

```html
<img src="/assets/images/posts/x/so-do-1600.webp" data-full="/assets/images/posts/x/so-do-6000.png" alt="…">
```

## 5. Hộp ghi chú

```liquid
{% include callout.html type="key" title="Điểm mấu chốt" content="Nội dung **markdown**." %}
```

`type`: `note` (xanh), `key` (xanh lục), `warn` (cam).

## 6. Thêm một dự án vào Portfolio

Tạo file trong `_portfolio/`, ví dụ `_portfolio/poster-2027.md`:

```markdown
---
title: "Tên dự án"
order: 1                 # số nhỏ hiện trước
year: 2027               # hiện to ở cột bên trái
place: "Hà Nội"          # nơi trưng bày / bối cảnh (không bắt buộc)
role: Thiết kế & nội dung
description: "Một câu mô tả."
cover: /assets/images/portfolio/poster-2027.jpg
tools: [Figma, Python]
gallery:                 # (không bắt buộc) 2 ảnh đầu hiện cạnh ảnh bìa ở trang Dự án;
                         # toàn bộ hiện thành lưới ở cuối trang dự án
  - src: /assets/images/portfolio/poster-2027-detail.jpg
    caption: "Chi tiết"
links:                   # (không bắt buộc)
  - label: "Bản PDF"
    url: "https://..."
---

Câu chuyện của dự án…
```

## 7. Sửa thông tin cá nhân

Mở `_config.yml`, sửa các dòng có dấu ✏️ (tên, giới thiệu, email, LinkedIn, ORCID).
Trang “Giới thiệu” nằm ở `about/index.md`.

## 8. Xoá nội dung mẫu

Khi đã có bài của riêng bạn, xoá 2 bài trong `_posts/`, 3 dự án trong `_portfolio/`
và ảnh mẫu trong `assets/images/posts/`, `assets/images/portfolio/`.

## (Tuỳ chọn) Xem trước trên máy

```bash
bundle install
bundle exec jekyll serve
# mở http://localhost:4000/Defrosting/
```
