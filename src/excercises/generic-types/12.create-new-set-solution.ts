// Solution

import type { Equal, Expect } from "@/type-utils";

export const createSet = <T>() => {
  return new Set<T>();
};
// <T>: là generic type parameter.
// new Set<T>(): tạo ra một Set chứa các phần tử có kiểu T.
// Nếu không truyền T, TS sẽ infer là unknown.
// 👉 Không có default type, nên nếu không truyền gì (createSet()), TypeScript sẽ mặc định T = unknown.

const stringSet = createSet<string>();  // Set<string>
const numberSet = createSet<number>();  // Set<number>
const unknownSet = createSet();         // Set<unknown>

type tests = [
  Expect<Equal<typeof stringSet, Set<string>>>,
  Expect<Equal<typeof numberSet, Set<number>>>,
  Expect<Equal<typeof unknownSet, Set<unknown>>>
];