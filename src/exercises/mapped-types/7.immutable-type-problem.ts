/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 11:45 PM
 * @File: 7.immutable-type-problem.ts
 */

// Problem
import type {Equal, Expect} from "@/type-utils";

// Phân tích bài toán
// file: immutable-type => type không thể thay đổi được (Không thêm sửa xoá được => hằng số?)
// Xem xét các test case thì thấy
// {
//     readonly name: string;
//     readonly age: number;
// }

// => Duyệt các properties trong object type => Thêm readonly => chỉ đọc (hằng số)

// @ts-ignore
type Immutable<T> = unknown;

type ExampleType = { name: string; age: number };

// Test case
// @ts-ignore
type ImmutableExample = Expect<
// @ts-ignore
    Equal<
        Immutable<ExampleType>,
        {
            readonly name: string;
            readonly age: number;
        }
    >
>;
