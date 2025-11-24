/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Tenery Operator
const number = 100;
const isTrue = number >= 100 ? true : false;

// Type Conditional = SomeType extends ? TrueType : FalseType;
type TypeConditional<T> = T extends string
    ? "This is a string type"
    : T extends number
    ? "This is a number type"
    : "Unknown type";

type Result1 = TypeConditional<string>; // "This is a string type"
type Result2 = TypeConditional<number>; // "This is a number type"
type Result3 = TypeConditional<boolean>; // "Unknown type"

// type AA = Parameters<() => void>; // []
type Parameters<T extends (...args: any) => any> = T extends (
    ...args: infer P
) => any
    ? P
    : never;

    // (...args: any) => any: Constraint to ensure T is a function type

type FuncType = (a: number, b: string) => void;
type Params = Parameters<FuncType>; // [number, string]

function logObject(x: number, y: string): void {};
// typeof logObject vì logObject là function không phải là type
// trong khi Parameters<T> yêu cầu T là type function
type LogObjectParams = Parameters<typeof logObject>; // [number, string]

// type ReturnType<T extends (...args: any) => any> = T extends (
//     ...args: any
// ) => infer R
//     ? R
//     : never;

type ReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
) => infer R
    ? R
    : never;
// Lấy kiểu trả về của function Utility type ReturnType<T>
// Utility Type là những type có sẵn trong TypeScript giúp thao tác với các kiểu dữ liệu một cách dễ dàng hơn
// ReturnType<T> lấy kiểu trả về của function type T
function sum(a: number, b: number): number {
    return a + b;
}

function logMyName(name: string): string {
    return `My name is ${name}`;
}

type SumReturnType = ReturnType<typeof sum>; // number
type LogMyNameReturnType = ReturnType<typeof logMyName>; // string

type FuncReturnType = (a: number, b: string) => boolean;
type RetType = ReturnType<FuncReturnType>; // boolean

type Extract<T, U> = T extends U ? T : never;
type X1 = Extract<string | string[], string[]>; // string[]

type Exclude<T, U> = T extends U ? never : T;
type X2 = Exclude<string | string[], string[]>; // string

// NonNullable<T>
type NonNullable<T> = T extends null | undefined ? never : T;
type X3 = NonNullable<string | null | undefined>; // string
