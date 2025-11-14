// Problem

import type { Equal, Expect } from "@/type-utils";

type AddRoutePrefix<T> = T extends string
  ? T extends `/${string}` // nếu T đã bắt đầu bằng '/'
    ? T                  // giữ nguyên
    : `/${T}`            // nếu chưa, thêm '/'
  : never;

// Hỗ trợ union types:
type AddRoutePrefixUnion<T> = T extends any ? AddRoutePrefix<T> : never;

// Hỗ trợ tuple types:
type AddRoutePrefixTuple<T extends readonly string[]> = {
  [K in keyof T]: AddRoutePrefix<T[K]>;
};

type tests = [
  Expect<Equal<AddRoutePrefix<"">, "/">>,
  Expect<Equal<AddRoutePrefix<"about">, "/about">>,
  Expect<Equal<AddRoutePrefix<"about/team">, "/about/team">>,
  Expect<Equal<AddRoutePrefix<"blog">, "/blog">>,
  // @ts-expect-error
  AddRoutePrefix<boolean>,
  // @ts-expect-error
  AddRoutePrefix<number>
];

// Với union:
type RoutesUnion = "about" | "/blog" | "contact";
type PrefixedUnion = AddRoutePrefixUnion<RoutesUnion>;

// Kết quả:
// PrefixedUnion = "/about" | "/blog" | "/contact"


// ✅ TS tự infer từng phần của union và thêm / nếu cần.
// Với tuple:
const routesTuple = ["about", "/blog", "contact"] as const;
type PrefixedTuple = AddRoutePrefixTuple<typeof routesTuple>;

// Kết quả:
// PrefixedTuple = ["/about", "/blog", "/contact"]

// as const rất quan trọng để TypeScript hiểu các phần tử là literal types, không phải string chung.