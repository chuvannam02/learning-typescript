// Problem

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

type Merge<A, B> = unknown;

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