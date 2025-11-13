/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:43 AM
 * @File: 2.extract-function-parameters-solution.ts
 */

// Solution
// Phân tích yêu cầu bài toán
// file: extract-function-parameters => Lọc lấy mảng danh sách các tham số của function
// @ts-ignore
function filterData(
// @ts-ignore
filter: string,
// @ts-ignore
model: string,
// @ts-ignore
limit?: number,
// @ts-ignore
offset?: number
) {
    console.log(`dữ liệu`);
};

// @ts-ignore
type FilterDataParameters = Parameters<typeof filterData>;

/** Expected
 type FilterDataParameters = [
 filter: string,
 model: string,
 limit?: number,
 offset?: number
 ]
 */
export {};
