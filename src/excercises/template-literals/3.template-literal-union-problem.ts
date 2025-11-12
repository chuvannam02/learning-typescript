/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 8:42 AM
 * @File: 3.template-literal-union-problem.ts
 */
import type {Equal, Expect} from "@/type-utils";

// Problem
// Phân tích yêu cầu bài toán
// file: template-literal-union => Sử dụng template-literal + union
// Xem xét các test cases
//  | "rye sandwich with cheese"
// => Như vậy là có type các loại bánh + sandwich with + type các loại topping (dùng template literal)

// @ts-ignore
type BreadType = "rye" | "brown" | "white";

// @ts-ignore
type Filling = "cheese" | "ham" | "salami";

type Sandwich = unknown;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type tests = [
    // @ts-ignore
    Expect<
        // @ts-ignore
        Equal<
            // @ts-ignore
            Sandwich,
            | "rye sandwich with cheese"
            | "rye sandwich with ham"
            | "rye sandwich with salami"
            | "brown sandwich with cheese"
            | "brown sandwich with ham"
            | "brown sandwich with salami"
            | "white sandwich with cheese"
            | "white sandwich with ham"
            | "white sandwich with salami"
        >
    >
];
