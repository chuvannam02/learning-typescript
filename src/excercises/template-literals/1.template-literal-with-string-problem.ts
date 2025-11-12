/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 8:00 AM
 * @File: 1.template-literal-with-string-problem.ts
 */

// Problem

// Phân tích yêu cầu đề bài
// file: template-literal-with-string => Sử dụng template literals
// Xem xét test case
// Ta thấy rằng truyền Route với / ở phía trước thì mới succeed

type Route = unknown;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const goToRoute = (route: Route) => {
};

// Should succeed:
goToRoute("/users");
goToRoute("/");
goToRoute("/admin/users");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
goToRoute("users/1");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
goToRoute("<http://facebook.com>");
