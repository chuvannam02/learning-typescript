/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
 
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
// => Mất đi Type Safety, không có kiểm tra lỗi lúc biên dịch.

// => Cách tiếp cận tối ưu sử dụng Generic
// // <T> là Type Variable (kiểu chung)

function identityGeneric<T>(arg: T): T {
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


function pair<T, V>(a: T, b: V): [T, V] {
    return [a, b];
}

pair<number, string>(1, "one"); // OK
pair("two", 2); // OK, TypeScript tự suy luận T là string, V là number

// Generic với Interface
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identityFunc<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identityFunc;

// Generic với Class
class GenericNumber<T> {
    zeroValue!: T;
    add!: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
    return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
    return x + y;
};


// Generic với Constraints
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    return arg;
}

// loggingIdentity(3); // Lỗi biên dịch, vì number không có thuộc tính length
loggingIdentity({ length: 10, value: 3 }); // OK

// Generic với keyof
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3 };

getProperty(x, "a"); // OK
// getProperty(x, "d"); // Lỗi biên dịch, vì 'd' không phải là key của x
