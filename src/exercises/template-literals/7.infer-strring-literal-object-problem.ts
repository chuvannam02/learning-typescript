/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 9:37 AM
 * @File: 7.infer-strring-literal-object-problem.ts
 */

// Problem

// Phân tích yêu cầu bài toán
// file: infer-string-literal-object
// Xem xét expected result:
// => Có 1 type object cần loại bỏ string maps trong key của object này

interface ApiData {
    "maps:longitude": string;
    "maps:latitude": string;
}

type RemoveMapsFromObj<T> = {
    [K in keyof T]: T[K];
};

// @ts-ignore
type DesiredShape = RemoveMapsFromObj<ApiData>;

// Expected Result:
// type DesiredShape = {
//   "longitude": string;
//   "latitude": string;
// }
