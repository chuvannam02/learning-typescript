// Problem

import type { Equal, Expect } from "@/type-utils";

// Vấn đề
// Bài toán kiểm tra xem nếu type X không extends null hoặc undefined thì tạo ra type mới bằng cách union type cũ với null và undefined
type Maybe = unknown;

type tests = [
  Expect<Equal<Maybe<string>, string | null | undefined>>,
  Expect<Equal<Maybe<number>, number | null | undefined>>,
  Expect<Equal<Maybe<boolean>, boolean | null | undefined>>,
  Expect<Equal<Maybe<null>, null | undefined>>
];