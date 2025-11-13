// Solution

import type { Equal, Expect } from "@/type-utils";

// 🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯🤯
type DeepFlat<T> = T extends [infer First, ...infer Rest] 
  ? DeepFlat<First> | DeepFlat<Rest> // duyệt từng phần tử
  : T extends Array<infer U>
  ? DeepFlat<U> // nếu phần tử là array tiếp, flatten tiếp
  : T; // nếu không phải array, giữ nguyên

// T extends [infer First, ...infer Rest] → giúp duyệt tuple
// T extends Array<infer U> → giúp duyệt array
// T → cuối cùng là giá trị leaf

type Deep = [["a"], ["b", "c"], [["d"]], [[[["e"]]]]];

type DeepTestResult = DeepFlat<Deep>;

type tests = [Expect<Equal<DeepTestResult, "a" | "b" | "c" | "d" | "e">>];