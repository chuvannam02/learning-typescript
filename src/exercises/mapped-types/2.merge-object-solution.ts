// Solution

import type { Equal, Expect } from "@/type-utils";

// Bài toán: Merge type 2 object
type X = {
  a: 1;
  b: number;
};

type Y = {
  a: 2;
  b: string;
  c: boolean;
};
// Có thể thể thấy rằng key trong property có thể bị trùng
// Nếu bị trùng thì sẽ lấy của object type thứ 2

// 🔹 Ý tưởng dùng generic type
// Lấy union key từ cả 2 object:

// keyof A | keyof B

// Duyệt qua các key và xác định type:
// Nếu key có trong B → dùng B[K]
// Nếu không → dùng A[K]
type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B ? B[K] : K extends keyof A ? A[K] : never;
};
// ✅ Giải thích:

// [K in keyof A | keyof B] → duyệt tất cả key của A và B

// K extends keyof B ? B[K] : ... → ưu tiên lấy type từ B

// K extends keyof A ? A[K] : never → nếu key không có trong B thì lấy từ A
type XY = Merge<X, Y>;

type tests = [
  Expect<
    Equal<
      XY,
      {
        a: 2;
        b: string;
        c: boolean;
      }
    >
  >
];

// Nếu muốn nâng cao hơn, có thể viết phiên bản Merge nhiều object:
type MergeAll<T extends object[]> = 
  T extends [infer First, ...infer Rest]
    ? First & MergeAll<Rest extends object[] ? Rest : []>
    : {};

// Cho phép merge một mảng object types
// Cũng giữ quy tắc ưu tiên type sau cùng nếu trùng key