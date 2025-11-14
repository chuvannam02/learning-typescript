// Solution

// Bài toán:
// Viết Type cho 1 funtion dạng (a: number, b: string) => number
// Tức là type cho 1 hàm có 2 tham số: a là số, b là chuỗi và giá trị trả về là một số
// Bây giờ mong muốn đặt ra là thêm 1 tham số nữa => hàm này nhận 3 tham số
// AppendArgument: thêm tham số X vào đầu danh sách tham số của function T
type AppendArgument<T extends (...args: any) => any, X> = T extends (
  ...args: infer P
) => infer R
  ? (x: X, ...args: P) => R
  : never;

// Giải thích:

// T extends (...args: infer P) => infer R

// infer P lấy ra tuple type của các tham số gốc [a: number, b: string]

// infer R lấy ra return type number

// (x: X, ...args: P) => R

// Tạo hàm mới:

// Tham số đầu tiên là x: X

// Các tham số còn lại giữ nguyên ...args: P

// Return type giữ nguyên R

// Nếu T không phải function → never.

// Example
type SomeF = (a: number, b: string) => number;

type FinalF = AppendArgument<SomeF, boolean>;
// FinalF is (x: boolean, a: number, b: string) => number

// Test case
const f: FinalF = (x, a, b) => {
  console.log(x, a, b);
  return a + b.length;
};

f(true, 10, "hello"); // ✅ hoạt động

// Split tuple P thành 2 phần:
// Take<N, P> -> lấy N phần tử đầu
// Drop<N, P> -> bỏ N phần tử đầu
type Take<
  N extends number,
  T extends any[],
  Acc extends any[] = []
> = Acc["length"] extends N
  ? Acc
  : T extends [infer F, ...infer R]
  ? Take<N, R, [...Acc, F]>
  : Acc;

type Drop<N extends number, T extends any[]> = N extends 0
  ? T
  : T extends [infer _, ...infer R]
  ? Drop<Subtract<N, 1>, R>
  : [];

type InsertAt<T extends any[], X, N extends number> = [
  ...Take<N, T>,
  X,
  ...Drop<N, T>
];

type InsertArgument<
  T extends (...args: any) => any,
  X,
  N extends number
> = T extends (...args: infer P) => infer R
  ? (...args: InsertAt<P, X, N>) => R
  : never;

// Chèn boolean vào đầu (vị trí 0)
type FinalF0 = InsertArgument<SomeF, boolean, 0>;
// (x: boolean, a: number, b: string) => number

// Chèn boolean vào giữa (vị trí 1)
type FinalF1 = InsertArgument<SomeF, boolean, 1>;
// (a: number, x: boolean, b: string) => number

// Chèn boolean vào cuối (vị trí 2)
type FinalF2 = InsertArgument<SomeF, boolean, 2>;
// (a: number, b: string, x: boolean) => number
