/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 8:42 AM
 * @File: 3.template-literal-union-solution.ts
 */

import type {Equal, Expect} from "@/type-utils";

// Solution
// Phân tích yêu cầu bài toán
// file: template-literal-union => Sử dụng template-literal + union
// Xem xét các test cases
//  | "rye sandwich with cheese"
// => Như vậy là có type các loại bánh + sandwich with + type các loại topping (dùng template literal)

type BreadType = "rye" | "brown" | "white";

type Filling = "cheese" | "ham" | "salami";

type Sandwich = `${BreadType} sandwich with ${Filling}`;

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

// 🧠 1. Tổng quát hoá bằng generic utility
// Nếu muốn tái sử dụng logic “tổ hợp template” cho nhiều use-case khác, ta viết hàm tổng quát:
type Combine<
    T1 extends string,
    T2 extends string,
    T3 extends string
> = `${T1} ${T2} sandwich with ${T3}`;
// @ts-ignore
type AllSandwiches = Combine<"small" | "medium" | "large", BreadType, Filling>;

// ⚙️ 3. Tự động sinh các tổ hợp bằng tuple và recursive template
// Nếu muốn làm động, ta có thể tổng quát thành Tuple Join utility:

type Join<
    Parts extends readonly string[],
    Delimiter extends string = " "
> = Parts extends [infer F extends string, ...infer R extends string[]]
    ? R["length"] extends 0
        ? F
        : `${F}${Delimiter}${Join<R, Delimiter>}`
    : "";


// → Sử dụng:
// @ts-ignore
type SandwichV2 = Join<["small", "white", "sandwich", "with", "ham"], " ">;
