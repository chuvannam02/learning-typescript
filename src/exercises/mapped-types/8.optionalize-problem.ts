// @ts-ignore
import type {Equal, Expect} from "@/type-utils";

/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 11:55 PM
 * @File: 8.optionalize-problem.ts
 */

// Problem

// Phân tích bài toán:
// file: optionalize ? chưa hiểu lắm
// Xem xét test case: <T, V> => V là type gì thì giữ nguyên
// Các key trong properties còn lại trong object thì thêm union | undefined ?

// @ts-ignore
type Optionalize<T, K> = unknown;

type ExampleType = { name: string; age: number; email: string };

// Test case
// @ts-expect-error
type OptionalNameAndAge = Expect<
// @ts-expect-error
    Equal<
        Optionalize<ExampleType, "name" | "age">,
        {
            name: string;
            age: number;
            email: string | undefined;
        }
    >
>;
// type OptionalNameAndAge = {
//   name: string;
//   age: number;
//   email: string | undefined;
// }
