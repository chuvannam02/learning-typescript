/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 8:00 AM
 * @File: 1.template-literal-with-string-solution.ts
 */

// SOlution

// Phân tích yêu cầu đề bài
// file: template-literal-with-string => Sử dụng template literals
// Xem xét test case
// Ta thấy rằng truyền Route với / ở phía trước thì mới succeed

type Route = `/${string}`;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const goToRoute = (route: Route) => {};

// Should succeed:
goToRoute("/users");
goToRoute("/");
goToRoute("/admin/users");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
goToRoute("users/1");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
goToRoute("<http://facebook.com>");

// 🧠 2️⃣ Hướng tổng quát hoá — 4 cấp độ
// Mức	Tên	Mô tả	Ví dụ
// ①	Basic Route	Chuỗi phải bắt đầu bằng /	/${string}
// ②	Nested Route Segments	Chỉ cho phép các ký tự hợp lệ trong từng segment	/users/:id, /blog/:slug/comments
// ③	Strict Route Pattern	Giới hạn pattern theo danh sách route hợp lệ	/users, /users/:id, /admin/:section
// ④	Generic Route Builder	Dựa trên danh sách route cấu hình sẵn	Route<["users", "posts"]> → /users | /posts

