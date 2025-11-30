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
- Tạo ra một kiểu mới bằng cách trích xuất (extract) từ Type các phần tử trong union mà có thể gán được (assignable) cho Union.
- Nói cách khác, nó trả về một Union Type mới chỉ bao gồm những thành viên từ Type mà thỏa mãn điều kiện là nằm trong hoặc tương thích với Union.
```Typescript
// ⚙️ Cách hoạt động:
type: type Extract<T, U> = T extends U ? T : never;
// Với mỗi phần tử trong union T, TypeScript sẽ kiểm tra xem nó có thể gán cho U không.
// Nếu có thể, nó giữ lại phần tử đó.
// Nếu không thể, nó loại bỏ (never).
// → Kết quả là một union mới chỉ gồm những phần tử phù hợp.

// 🛠️ Cách sử dụng
// Cú pháp của nó rất đơn giản:
type ResultType = Extract<Type, Union>;
// Type: Union Type ban đầu mà bạn muốn lọc.
// Union: Kiểu dùng để làm tiêu chí lọc. Chỉ những thành viên của Type mà tương thích với Union mới được giữ lại.

// type T0 = Extract<"a" | "b" | "c", "a" | "f">;
// Ví dụ 1: Lọc chuỗi và số
type OriginalUnion = "a" | "b" | "c" | 1 | 2;

// Lọc ra các thành viên là chuỗi trong OriginalUnion mà cũng thuộc "a" | "d"
// Các thành viên trong OriginalUnion là: "a", "b", "c", 1, 2
// Tiêu chí lọc (Union) là: "a" | "d"
// Kết quả: Chỉ có "a" từ OriginalUnion là thỏa mãn tiêu chí lọc.
type StringExtract = Extract<OriginalUnion, "a" | "d">;
// type StringExtract = "a"

type T0 = "a"
// Ví dụ 2: Lọc theo kiểu dữ liệu (Kiểu hàm)
type MixedUnion = string | number | (() => void) | boolean;

// Lọc ra các thành viên của MixedUnion mà có thể gán cho Function
// - string: Không gán được cho Function
// - number: Không gán được cho Function
// - (() => void): Có thể gán được cho Function
// - boolean: Không gán được cho Function
type FunctionOnly = Extract<MixedUnion, Function>;
// type FunctionOnly = () => void

type T1 = () => void

// Ví dụ 3: Lọc theo thuộc tính (Discriminated Unions)
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; x: number }
    | { kind: "triangle"; x: number; y: number };

// Lọc ra các thành viên của Shape mà có thể gán được cho { kind: "circle" }
// - { kind: "circle"; radius: number }: Có thuộc tính 'kind' là "circle" và tương thích. => Giữ lại
// - { kind: "square"; x: number }: Thuộc tính 'kind' là "square". => Loại bỏ
// - { kind: "triangle"; x: number; y: number }: Thuộc tính 'kind' là "triangle". => Loại bỏ
type CircleShape = Extract<Shape, { kind: "circle" }>;
/*
type CircleShape = {
    kind: "circle";
    radius: number;
}
*/

type T2 = Extract<Shape, { kind: "circle" }>

type T2 = {
    kind: "circle";
    radius: number;
}

// ✅ Ví dụ thực tế
type ApiResponse =
    | { status: "success"; data: string }
    | { status: "error"; message: string };

type SuccessResponse = Extract<ApiResponse, { status: "success" }>;
// -> { status: "success"; data: string }

type ErrorResponse = Extract<ApiResponse, { status: "error" }>;
// -> { status: "error"; message: string }
type SuccessResponse = Extract<ApiResponse, { status: "success" }>;
type ErrorResponse = Extract<ApiResponse, { status: "error" }>;

function handleResponse(res: ApiResponse) {
    if (res.status === "success") {
        const data: SuccessResponse = res; // ✅ type-safe
        console.log("Data:", data.data);
    } else if (res.status === "error") {
        const error: ErrorResponse = res; // ✅ type-safe
        console.error("Error:", error.message);
    }
}

// 🔧 3. Ví dụ trong Redux-style Actions
// Giả sử bạn có type union cho toàn bộ action:
type Action =
    | { type: "ADD_TODO"; payload: string }
    | { type: "REMOVE_TODO"; id: number }
    | { type: "CLEAR_ALL" };

// Bạn muốn viết reducer chỉ xử lý "ADD_TODO" action.

type AddTodoAction = Extract<Action, { type: "ADD_TODO" }>;

function reducer(state: string[], action: Action): string[] {
    if (action.type === "ADD_TODO") {
        const addAction: AddTodoAction = action;
        return [...state, addAction.payload];
    }
    return state;
}
```
- Exclude<UnionType, ExcludedMembers>: Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.
- Ngược lại với Extract
- Tạo ra một kiểu mới bằng cách Loại bỏ (exclude) từ Type các phần tử trong union mà có thể gán được (assignable) cho Union.
- Nói cách khác, nó trả về một Union Type mới chỉ bao gồm những thành viên từ Type mà không thỏa mãn điều kiện là nằm trong hoặc tương thích với Union.
```Typescript
type Exclude<T, U> = T extends U ? never : T;
type T0 = Exclude<"a" | "b" | "c", "a">;
     
type T0 = "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
     
type T1 = "c"
type T2 = Exclude<string | number | (() => void), Function>;
     
type T2 = string | number
 
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };
 
type T3 = Exclude<Shape, { kind: "circle" }>
     
type T3 = {
    kind: "square";
    x: number;
} | {
    kind: "triangle";
    x: number;
    y: number;
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
// Định nghĩa
type ReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
) => infer R
    ? R
    : never;
// Phân tích
// - `<T extends (...args: any) => any>`: Constraint in Generic => Bắt buộc truyền type function vào Generic
// - `T extends (...args: any) => infer R ? R : never;`: để thiểu đoạn này cần tách nhỏ đoạn code ra
// `[(T extends (...args: any) => infer R)] ? R : never;`: thay A = [(T extends (...args: any) => infer R)] => A ? R : never; => Conditional Type: Nếu A thì trả về Type R, còn không thì trả về never;
// Tiếp tục bóc tách `[(T extends (...args: any) => infer R)]`
// - (...args: any) => infer R: là type của function
// - `<T extends (...args: any) => any>` trong generic đã ràng buộc phải truyền type function rồi => Câu hỏi đặt ra là tại sao cần viết lại lần nữa
// Bạn có để ý thấy không => đoạn sau có sử dụng từ khoá `infer`
// => trích xuất kiểu trả về của function (Vì không biết thực tế kiểu trả về của function là gì => cần dùng infer R => Để tự suy kiểu trả về của function => Đặt tổng quát là R)
// => T extends (...args: any): infer R: Kiểm tra xem T có phải là type function không?
// Nếu phải thì từ infer kiểu trả về R => trả về R nếu không thì trả về never.

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
// Type 'string' does not satisfy the constraint '(...args: any) => any'.
     
// type T7 = any
type T8 = ReturnType<Function>;
// Type 'Function' does not satisfy the constraint '(...args: any) => any'.
//   Type 'Function' provides no match for the signature '(...args: any): any'.
     
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

- Required<Type>: Constructs a type consisting of all properties of T set to required. (Tạo một kiểu mới với tất cả các thuộc tính của T đều là bắt buộc)
- The opposite of Partial
```Typescript
// Example
interface Props {
    a?: number;
    b?: string;
}

const obj: Props = {
    a: 5
};

const obj2: Required<Props> = {
    a: 5
};
// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
```

- Pick<Type, Keys>: Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.
(Tạo ra type mới bằng cách chọn 1 tập các keys trong properties (Có thể là string literals hoặc union các string literals) từ Type truyền vào)
```Typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
 
type TodoPreview = Pick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```
