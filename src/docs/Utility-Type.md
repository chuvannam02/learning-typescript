- NonNullable<T>: Constructs a type by excluding null and undefined from Type. (Khởi tạo Type mới bằng cách loại bỏ null, undefined khỏi Type ban đầu)

```Typescript
Example
type T0 = NonNullable<string | number | undefined>;
     
type T0 = string | number
type T1 = NonNullable<string[] | null | undefined>;
     
type T1 = string[]
```

- ➤ Omit<O, K>: Loại bỏ (bỏ qua) các keys có tên nằm trong K khỏi O
```Typescript
type Omit<O, K> = Pick<O, Exclude<keyof O, K>>;
Omit<{ a: 1; b: 2; c: 3 }, "a" | "b">
// => { c: number }
```

- Extract<Type, Union>: Constructs a type by extracting from Type all union members that are assignable to Union.
```Typescript
type T0 = Extract<"a" | "b" | "c", "a" | "f">;
     
type T0 = "a"
type T1 = Extract<string | number | (() => void), Function>;
     
type T1 = () => void
 
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type T2 = Extract<Shape, { kind: "circle" }>
     
type T2 = {
    kind: "circle";
    radius: number;
}
```

- Parameters<Type>: Constructs a tuple type from the types used in the parameters of a function type Type.
For overloaded functions, this will be the parameters of the last signature; see Inferring Within Conditional Types.
- Parameters là một utility type dùng để lấy kiểu của tất cả arguments của hàm dưới dạng tuple.
```Typescript
// Example
function greet(name: string, age: number) {
  return `Hello ${name}, age ${age}`;
}

type GreetArgs = Parameters<typeof greet>;
// GreetArgs = [name: string, age: number]
// Bạn có thể dùng tuple này để pass arguments dynamically:

const args: GreetArgs = ["Alice", 30];
const message = greet(...args);
declare function f1(arg: { a: number; b: string }): void;
 
type T0 = Parameters<() => string>;
     
type T0 = []
type T1 = Parameters<(s: string) => void>;
     
type T1 = [s: string]
type T2 = Parameters<<T>(arg: T) => T>;
     
type T2 = [arg: unknown]
type T3 = Parameters<typeof f1>;
     
type T3 = [arg: {
    a: number;
    b: string;
}]
type T4 = Parameters<any>;
     
type T4 = unknown[]
type T5 = Parameters<never>;
     
type T5 = never
type T6 = Parameters<string>;
Type 'string' does not satisfy the constraint '(...args: any) => any'.
     
type T6 = never
type T7 = Parameters<Function>;
Type 'Function' does not satisfy the constraint '(...args: any) => any'.
  Type 'Function' provides no match for the signature '(...args: any): any'.
     
type T7 = never
```

- ReturnType<Type>: Constructs a type consisting of the return type of function Type.
For overloaded functions, this will be the return type of the last signature; see Inferring Within Conditional Types.
- ReturnType là một utility type có sẵn trong TypeScript, dùng để lấy kiểu trả về của một hàm.
```Typescript
function sum(a: number, b: number) {
  return a + b;
}

type SumReturn = ReturnType<typeof sum>;
// SumReturn = number

declare function f1(): { a: number; b: string };
 
type T0 = ReturnType<() => string>;
     
type T0 = string
type T1 = ReturnType<(s: string) => void>;
     
type T1 = void
type T2 = ReturnType<<T>() => T>;
     
type T2 = unknown
type T3 = ReturnType<<T extends U, U extends number[]>() => T>;
     
type T3 = number[]
type T4 = ReturnType<typeof f1>;
     
type T4 = {
    a: number;
    b: string;
}
type T5 = ReturnType<any>;
     
type T5 = any
type T6 = ReturnType<never>;
     
type T6 = never
type T7 = ReturnType<string>;
Type 'string' does not satisfy the constraint '(...args: any) => any'.
     
type T7 = any
type T8 = ReturnType<Function>;
Type 'Function' does not satisfy the constraint '(...args: any) => any'.
  Type 'Function' provides no match for the signature '(...args: any): any'.
     
type T8 = any

// 3️⃣ Kết hợp ReturnType + Parameters

// Một ứng dụng phổ biến là viết wrapper function mà:

// Duy trì kiểu trả về của hàm gốc

// Duy trì kiểu arguments của hàm gốc

// Ví dụ: makeSafe (wrapper safe call)
function makeSafe<F extends (...args: any[]) => any>(func: F) {
  return (...args: Parameters<F>) => {
    try {
      const result: ReturnType<F> = func(...args);
      return { type: "success", result } as const;
    } catch (error) {
      return { type: "failure", error: error as Error } as const;
    }
  };
}

// Sử dụng
const safeSum = makeSafe((a: number, b: number) => a + b);

const result = safeSum(2, 3);
// result: { type: "success"; result: number } | { type: "failure"; error: Error }

// TypeScript bắt lỗi nếu pass sai arguments
// safeSum(2, "3"); // ❌ Error
```