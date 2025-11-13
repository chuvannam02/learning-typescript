// SOlution

import type { Equal, Expect } from "@/type-utils";

// Vấn đề
// Truyền generic <T, U> nhưng U là null
type CreateDataShape<TData, TError = null> = {
  data: TData;
  error: TError extends null ? undefined : TError;
};

type tests = [
  Expect<
    Equal<
      CreateDataShape<string>,
      {
        data: string;
        error: undefined;
      }
    >
  >,
  Expect<
    Equal<
      CreateDataShape<boolean, SyntaxError>,
      {
        data: boolean;
        error: SyntaxError;
      }
    >
  >
];