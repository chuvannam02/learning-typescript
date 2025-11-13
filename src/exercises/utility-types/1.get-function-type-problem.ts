/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:40 AM
 * @File: 1.get-function-type-problem.ts
 */

// Problem
// Phân tích yêu cầu bài toán
// file: get-function-type => Lấy type trả về từ function
// @ts-ignore
function total(a: number, b: number): number {
    return a + b;
}
// @ts-ignore
type TotalReturnType = unknown;
// expected: type TotalReturnType = number;
