---
title: "AI trong khoa Phụ sản: từ màn hình siêu âm đến băng ghi tim thai"
description: "Một bản đồ nhập môn về những nơi trí tuệ nhân tạo đang chạm vào thực hành sản phụ khoa — và vì sao bác sĩ vẫn là người ra quyết định."
tags: [Phụ sản, Siêu âm, CTG, Nhập môn]
cover: /assets/images/posts/ai-phu-san/cover-silk.svg
cover_caption: "Tranh lụa minh hoạ: hồ sen buổi sớm, khi sương đang tan."
references:
  - "FIGO Safe Motherhood and Newborn Health Committee (2015). *FIGO consensus guidelines on intrapartum fetal monitoring.* International Journal of Gynecology & Obstetrics."
  - "World Health Organization (2021). *Ethics and governance of artificial intelligence for health.* Geneva: WHO."
---

{% include callout.html type="warn" title="Bài viết mẫu" content="Đây là bài **mẫu** để minh hoạ giao diện blog. Hãy thay bằng nội dung, số liệu và nguồn của bạn trước khi coi đây là tài liệu tham khảo." %}

Khoa Phụ sản là nơi có **rất nhiều hình ảnh và tín hiệu**: ảnh siêu âm, băng ghi tim thai, ảnh tế bào cổ tử cung, ảnh phôi trong hỗ trợ sinh sản. Đó cũng chính là loại dữ liệu mà các mô hình học sâu (deep learning) xử lý tốt nhất. Bài này vẽ một bản đồ đơn giản: AI đang chạm vào những khâu nào, và ở mỗi khâu, nó *làm gì* — và *không làm gì*.

## 1. Siêu âm sản khoa

Siêu âm phụ thuộc nhiều vào tay nghề người làm. Một mặt cắt lệch vài độ có thể làm sai số đo. Vì vậy phần lớn các ứng dụng AI ở đây tập trung vào việc **chuẩn hoá**:

{% include figure.html src="/assets/images/posts/ai-phu-san/ultrasound-tasks.svg" alt="Sơ đồ bốn nhiệm vụ của AI trong siêu âm sản khoa" caption="Bốn nhiệm vụ thường gặp: nhận diện mặt cắt chuẩn, đo sinh trắc tự động, gợi ý vùng bất thường và kiểm soát chất lượng ảnh. Bấm vào hình để phóng to." size="wide" %}

### Đo sinh trắc tự động

Khi mô hình đã tìm đúng mặt cắt, việc đo đường kính lưỡng đỉnh (BPD), chu vi đầu (HC), chu vi bụng (AC) hay chiều dài xương đùi (FL) trở thành bài toán **phân đoạn ảnh**: tìm đường viền rồi tính kích thước.

> Giá trị lớn nhất có lẽ không phải là "nhanh hơn", mà là **ít khác biệt hơn** giữa các người đo.

## 2. Monitor tim thai (CTG)

Đọc CTG trong chuyển dạ là việc khó: tín hiệu dài, nhiễu, và các hướng dẫn phân loại (ví dụ của FIGO) vẫn để lại nhiều chỗ cho diễn giải chủ quan.

![Sơ đồ hệ thống hỗ trợ đọc CTG](/assets/images/posts/ai-phu-san/ctg-pipeline.svg "Đường đi của dữ liệu trong một hệ thống hỗ trợ đọc CTG. Mũi tên nét đứt là vòng phản hồi giúp đánh giá mô hình theo thời gian."){: .wide}

Một hệ thống hỗ trợ thường gồm các bước:

1. **Thu tín hiệu** nhịp tim thai và cơn co tử cung.
2. **Tiền xử lý**: loại nhiễu, đánh dấu đoạn mất tín hiệu.
3. **Mô hình** trích xuất đặc trưng (nhịp nền, dao động, nhịp tăng, nhịp giảm) và ước lượng mức nguy cơ.
4. **Cảnh báo** kèm giải thích — vì sao mô hình lo ngại.
5. **Bác sĩ, nữ hộ sinh** quyết định.

{% include callout.html type="key" title="Điểm mấu chốt" content="AI ở đây là **người đọc thứ hai không biết mệt**, không phải người quyết định. Một cảnh báo tốt phải giải thích được và phải được kiểm chứng trên dữ liệu của chính bệnh viện." %}

## 3. Những khâu khác

| Lĩnh vực | AI hỗ trợ việc gì | Dữ liệu chính |
|---|---|---|
| Hỗ trợ sinh sản (IVF) | Đánh giá, xếp hạng phôi | Ảnh time-lapse phôi |
| Sàng lọc ung thư cổ tử cung | Đọc tiêu bản tế bào | Ảnh tiêu bản số hoá |
| Theo dõi thai kỳ | Dự báo nguy cơ (ví dụ tiền sản giật) | Bệnh án, xét nghiệm |
| Vận hành phòng sinh | Dự báo lưu lượng, phân bổ giường | Dữ liệu hành chính |

## 4. Câu hỏi cần đặt ra trước khi triển khai

- Mô hình được huấn luyện trên **dân số nào**? Có giống sản phụ Việt Nam không?
- Ai chịu trách nhiệm khi AI và bác sĩ bất đồng?
- Có kế hoạch **theo dõi hiệu năng** sau khi đưa vào dùng không?

---

Ở bài sau, mình sẽ bàn về chuyện lớn hơn: để những công cụ này thật sự chạy được trong bệnh viện Việt Nam, hệ thống cần thay đổi gì.
