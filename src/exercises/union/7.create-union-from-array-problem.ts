/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:17 AM
 * @File: 7.create-union-from-array-problem.ts
 */

// Problem
// Phân tích yêu cầu bài toán
// file: create-union-from-array => Tạo ra kiểu union từ array
// Xem xét các test cases: Chuyển các giá trị trong array => thành uion
import type {Equal, Expect} from "@/type-utils";

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cars = ["BMW", "Toyota", "Mercedes", "Bentley", "Lamborghini"] as const;

type Car = typeof cars;

type BmwOrToyota = unknown;

// @ts-ignore
type tests = [
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
    Expect<Equal<Car, "BMW" | "Toyota" | "Mercedes" | "Bentley" | "Lamborghini">>,
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
    Expect<Equal<BmwOrToyota, "BMW" | "Toyota">>
];
