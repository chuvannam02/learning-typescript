# Generic
- Generic là gì?
- 1 cách để tạo ra code linh hoạt và tái sử dụng bằng cách cho phép chúng ta định nghĩa các Types mà sẽ được chi định sau khi được viết code.
Cho phép viết code hoạt động trên nhiều loại kiểu dữ liệu khác nhau mà không cần viết lại nhiều lần cho mỗi loại dữ liệu.
- Generic = Code Tái Sử dụng (Reusable Code) và An toàn Kiểu dữ liệu (Type Safety). (Types linh động hơn, không cố định)
- Cấu trúc: `<T>`
```Typescript
// Ví dụ viết một hàm Identity là một hàm đơn giản nhận một giá trị đầu vào và trả về chính giá trị đó chẳng hạn
// Nếu không dùng generic
// Chỉ hoạt động với kiểu number
function identityNumber(arg: number): number {
    return arg;
}

// Chỉ hoạt động với kiểu string
function identityString(arg: string): string {
    return arg;
}
// => code dài dòng, không linh hoạt

// Dùng 'any' cho phép chấp nhận mọi kiểu dữ liệu
function identityAny(arg: any): any {
    return arg;
}

let outputAny = identityAny("hello"); // outputAny là kiểu 'any'
// console.log(outputAny.length); // OK
// console.log(outputAny.toFixed(2)); // OK, nhưng sẽ lỗi lúc runtime nếu outputAny là string!
// => Mất đi Type Safety, không có kiểm tra lỗi lúc biên dịch.

// => Cách tiếp cận tối ưu sử dụng Generic
// // <T> là Type Variable (kiểu chung)

function indentity<T>(arg: T): T {
    return arg;
}
// 1. Dùng với number
let outputNumber = identityGeneric<number>(100); 
// TypeScript tự suy luận outputNumber là kiểu number
// outputNumber.toFixed(2); // OK

// 2. Dùng với string
let outputString = identityGeneric("Hello Generic"); 
// TypeScript tự suy luận outputString là kiểu string
// outputString.length; // OK
// outputString.toFixed(2); // Lỗi biên dịch, vì string không có toFixed! (Type Safety được đảm bảo)

// 3. Dùng với array
let outputArray = identityGeneric<number[]>([1, 2, 3]);
// TypeScript tự suy luận outputArray là kiểu number[]
```

- Constraint trong Generic: đảm bảo rằng giới hạn type T truyền vào thoả mãn điều kiện ràng buộc.
- Khi sử dụng từ khoá `extends` trong Generic Type thì nó được dùng để áp đặt ràng buộc (Constraint)
trên kiểu dữ liệu generic mà chúng ta dùng, giới hạn các loại kiểu con mà chúng ta có thể sử dụng cho tham số Generic cụ thể.
- Giúp kiểm soát và định rõ những ràng buộc về kiểu dữ liệu, giúp Typescript
kiểm tra kiểu tốt hơn và nó cũng cung cấp các gợi ý, cũng như các thông báo lỗi khi có sai sót khi sử dụng.

```typescript
type GenericType<T extends ConstraintType> = ...

// Ví dụ: đảm bảo rằng truy cập thuộc tính mà đảm bảo chúng tồn tại trong object => tránh undefined
// => Xong đến lúc chạy lên môi trường dev rồi, test tới tính năng đó thì mới biết => Tốn thời gian
// => Sử dụng Constraint trong Generic thì báo lỗi lúc compile time luôn => Có thể sửa ngay lập tức.
// Ví dụ cụ thể: Viết một hàm nhận 2 tham số: 1 là object, 2 là key trong object sau đó log ra/ hoặc trả về giá trị tương ứng với key bên trong object
const obj = {
    name: "Chu Văn Nam,",
    age: 23,
    school: "NEU",
    isRich: false
};

function getValueKeyOfObject<T extends Record<string, any>, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
// getValueKeyOfObject(obj, "name"); => output is: "Chu Văn Nam",
// getValueKeyOfObject(obj, "chuvannam"); => Báo lỗi ngay vì trong obj này k có property "chuvannam"
```

- Giải thích: T extends (...args: any) => any
+ Dòng code trên nghĩa là: type T phải thoả mãn Constraint rằng T phải là type của function (có thể không truyền tham số, hoặc truyền n tham số với kiểu dữ liệu bất kỳ), 
kiểu trả về là kiểu dữ liệu bất kỳ
+ Nếu truyền vào kiểu dữ liệu khác function => Lập tức báo lỗi ngay.
```typescript
// Parameters Utility Type
// Mục tiêu là lấy danh sách (Tuple) các tham số (cùng type các các tham số) trong function
type Parameters<T extends (...args: any) => any> = T extends (
    ...args: infer P
) => any
    ? P
    : never;

// ReturnType Utility Type
// Mục tiêu là lấy type trả về của function
type ReturnType<T extends (...args: any) => any> = T extends (
    ...args: any
) => infer R
    ? R
    : never;
```
