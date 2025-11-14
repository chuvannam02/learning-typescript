// SOlution

import type { Equal, Expect } from "@/type-utils";

// Mục tiêu: hiểu default type parameter trong generic
// export const createSet = <T = string>() => {
//   return new Set<T>();
// };

const stringSet = createSet<string>(); // => Set<string>
const numberSet = createSet<number>(); // => Set<number>
const unknownSet = createSet(); // => Set<string> (mặc định T = string)

type tests = [
  Expect<Equal<typeof stringSet, Set<string>>>,
  Expect<Equal<typeof numberSet, Set<number>>>,
  Expect<Equal<typeof unknownSet, Set<string>>>
];

// 🔧 Hỗ trợ infer kiểu từ tuple, array, hoặc nhiều args
export function createSet<T>(): Set<T>;
export function createSet<T>(iterable: Iterable<T>): Set<T>;
export function createSet<T extends readonly unknown[]>(...args: T): Set<T[number]>;
export function createSet(...args: any[]): Set<any> {
  // ✅ Nếu chỉ có 1 tham số và nó là iterable → dùng trực tiếp
  if (args.length === 1 && Symbol.iterator in Object(args[0])) {
    return new Set(args[0]);
  }
  // ✅ Nếu có nhiều args → tạo Set từ các args
  return new Set(args);
}

const set1 = createSet<string>();        // Set<string>
const set2 = createSet(["a", "b"]);      // Set<string>
const set3 = createSet([1, 2, 3]);       // Set<number>
const set4 = createSet(1, 2, 3);         // Set<number>
const set5 = createSet("x", "y", "z");   // Set<string>
const set6 = createSet([true, false]);   // Set<boolean>
const set7 = createSet();                // Set<unknown>

type cases1 = [
  Expect<Equal<typeof set1, Set<string>>>,
  Expect<Equal<typeof set2, Set<string>>>,
  Expect<Equal<typeof set3, Set<number>>>,
  Expect<Equal<typeof set4, Set<number>>>,
  Expect<Equal<typeof set5, Set<string>>>,
  Expect<Equal<typeof set6, Set<boolean>>>,
  Expect<Equal<typeof set7, Set<unknown>>>
];