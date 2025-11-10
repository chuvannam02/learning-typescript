// Problem

import type { Equal, Expect } from "@/type-utils";

// Mục tiêu
// Lấy type của giá trị trả về của function
type ReturnTypeOfFunction<T> = unknown;

// Test cases
type Case1 = Expect<Equal<ReturnTypeOfFunction<() => number>, number>>; // number
type Case2 = Expect<
  Equal<ReturnTypeOfFunction<(x: string) => boolean>, boolean>
>; // boolean