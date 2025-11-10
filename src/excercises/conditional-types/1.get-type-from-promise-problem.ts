// Problem
import type { Equal, Expect } from "@/type-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;

type ResultX = Transform<X>;
type ResultY = Transform<Y>;

type Transform<A> = unknown;

type tests = [
  Expect<Equal<ResultX, string>>,
  Expect<Equal<ResultY, { field: number }>>
];

// Vấn đề của exercise này
// Type 'false' does not satisfy the constraint 'true'.ts(2344)
// (alias) type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false
// import Equal