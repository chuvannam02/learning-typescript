// Solution

import type { Equal, Expect } from "@/type-utils";

// Mục tiêu
// Lấy type của giá trị trả về của function
type ReturnTypeOfFunction<T> = T extends (...args: any) => infer R ? R : never;
// T extends (...args: any) => infer R
// → Đây là conditional type với infer.

// T có phải là một function hay không?

// (...args: any) nghĩa là function có thể có bất kỳ số lượng và type argument nào.

// infer R nghĩa là “bắt” type trả về của function, gán cho R.

// ? R : never
// → Nếu T là function, trả về type R (type trả về của function),
// → Nếu không phải function, trả về never.

// Test cases
type Case1 = Expect<Equal<ReturnTypeOfFunction<() => number>, number>>; // number
type Case2 = Expect<
  Equal<ReturnTypeOfFunction<(x: string) => boolean>, boolean>
>; // boolean