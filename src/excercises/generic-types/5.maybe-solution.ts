// Solution

import type { Equal, Expect } from "@/type-utils";

export type Maybe<T> = T extends (null | undefined) ? (null | undefined) : (T | null | undefined);

type tests = [
  Expect<Equal<Maybe<string>, string | null | undefined>>,
  Expect<Equal<Maybe<number>, number | null | undefined>>,
  Expect<Equal<Maybe<boolean>, boolean | null | undefined>>,
  Expect<Equal<Maybe<null>, null | undefined>>,
  Expect<Equal<Maybe<undefined>, null | undefined>>,
  Expect<Equal<Maybe<undefined | null>, null | undefined>>
];