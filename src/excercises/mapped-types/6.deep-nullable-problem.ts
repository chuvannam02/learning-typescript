/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 11:31 PM
 * @File: 6.deep-nullable-problem.ts
 */

// Problem
// Phân tích bài toán:
// file: deep-nullable => Cho phép object chứa các properties có thể có giá trị null?
// Nhìn test case chắc dùng union thêm vào type của các value tương ứng với key trong object type à?
import type {Equal, Expect} from "@/type-utils";

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type DeepNullable<T> = unknown;

type ExampleType = {
    name: string;
    age: number;
    isStudent: boolean;
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type NullableExample = DeepNullable<ExampleType>;

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Tests = Expect<
// @ts-ignore
    Equal<DeepNullable<ExampleType>, { name: null; age: null; isStudent: null }>
>;


