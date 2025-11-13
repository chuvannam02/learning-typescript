/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:40 AM
 * @File: 1.get-function-type-solution.ts
 */

// Solution
// Phân tích yêu cầu bài toán
// file: get-function-type => Lấy type trả về từ function
// @ts-ignore
function total(a: number, b: number): number {
    return a + b;
}

// @ts-ignore
function combine(a: string, b: string): string {
    return a + b;
}

// @ts-ignore
// ReturnType là một Utility Type trả về (type trả về của Function)
type TotalReturnType = ReturnType<typeof total>;
// expected: type TotalReturnType = number;
