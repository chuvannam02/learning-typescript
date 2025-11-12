/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 9:10 AM
 * @File: 5.template-literal-uppercase-object-solution.ts
 */

// Solution

// Phân tích yêu cầu bài toán
// file: template-literal-uppercase-object => Sử dụng template literal, uppercase-object ? => KEY viết hoa à?
// Xem xét kết quả mong đợi
// = > Chuyển string union type => dạng object mà key của nó toàn bộ viết hoa

type Event = `log_in` | "log_out" | "sign_up";

// @ts-ignore
type ObjectOfKeys = {
    [K in `${Uppercase<Event>}`]: string
};

// Expected Result:
// {
//   LOG_IN: string
//   LOG_OUT: string
//   SIGN_UP: string
// }

export {};
