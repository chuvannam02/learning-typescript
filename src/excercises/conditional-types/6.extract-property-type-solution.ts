// Solution
import type { Equal, Expect } from "@/type-utils";

// PropertyType: lấy type của property U trong object T
type PropertyType<T, U extends string> = U extends keyof T ? T[U] : never;
// Tình huống có 1 Object có Type R
// Bây giờ truyền vào tên 1 key trong số properties của object
// nếu mà key này tồn tại trong object => trả về type của key đó
// Nếu không thì trả về never?

// Giải thích:

// U extends keyof T ? T[U] : never

// keyof T là tập hợp tất cả keys của object T.

// Nếu U thuộc tập keys đó → trả về type của property T[U].

// Nếu U không thuộc keys → trả về never.

// Ví dụ với ExampleType:

// "name" thuộc keys → type là string

// "age" thuộc keys → type là number

// "nonExist" không thuộc keys → type là never

// Test cases
type ExampleType = { name: string; age: number; isStudent: boolean };

type NameType = Expect<Equal<PropertyType<ExampleType, "name">, string>>; // string

type AgeType = Expect<Equal<PropertyType<ExampleType, "age">, number>>; // number

type IsStudentType = Expect<Equal<PropertyType<ExampleType, "isStudent">, boolean>>; // boolean

type NonExistType = Expect<Equal<PropertyType<ExampleType, "nonExist">, never>>; // never