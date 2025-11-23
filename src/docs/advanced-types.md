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

# Conditional Type

# Mapped Type

# Indexed

# Utility
