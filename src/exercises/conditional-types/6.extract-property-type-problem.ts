// Problem
import type { Equal, Expect } from "@/type-utils";

type PropertyType = unknown;
// Tình huống có 1 Object có Type R
// Bây giờ truyền vào tên 1 key trong số properties của object
// nếu mà key này tồn tại trong object => trả về type của key đó
// Nếu không thì trả về never?

// Test cases
type ExampleType = { name: string; age: number; isStudent: boolean };

type NameType = Expect<Equal<PropertyType<ExampleType, "name">, string>>; // string

type AgeType = Expect<Equal<PropertyType<ExampleType, "age">, number>>; // number