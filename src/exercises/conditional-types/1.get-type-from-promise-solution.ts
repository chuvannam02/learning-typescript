// Solution
import type { Equal, Expect } from "@/type-utils";

type X = Promise<string>;
type Y = Promise<{ field: number }>;
type Z = Promise<boolean>;
// Ở đây:

// X là Promise chứa string

// Y là Promise chứa object { field: number }

// Z là Promise chứa boolean

// 🎯 Mục tiêu mong muốn

// Ta muốn:

// Input (A)	Output (Transform<A>)
// Promise<string>	string
// Promise<{ field: number }>	{ field: number }
// Promise<boolean>	boolean

type ResultX = Transform<X>;
type ResultY = Transform<Y>;
type ResultZ = Transform<Z>;

// Generic Type Transform<A>
// Cụ thể hơn, Transform là một generic type alias có tham số kiểu (type parameter) là A.
// type Transform<A> = unknown;
// Giải thích
type Transform<A> = A extends Promise<infer R> ? R : never;
// type Transform<A> = A extends Promise<{ field: number }>
//   ? { field: number }
//   : never;
// type Transform<A> = A extends Promise<string> ? string : never;
// type Transform<A> = A extends Promise<boolean> ? boolean : never;

// Giải thích từng phần:
// Thành phần	Ý nghĩa
// A	Tham số kiểu (generic parameter) — kiểu mà ta muốn xử lý
// extends Promise<infer R>	Kiểm tra xem A có phải là một Promise hay không
// infer R	Nếu đúng, TypeScript sẽ tự suy luận kiểu dữ liệu được chứa bên trong Promise và gán vào biến tạm R
// ? R : never	Nếu đúng → trả về R, nếu sai → trả về never

type tests = [
  Expect<Equal<ResultX, string>>,
  Expect<Equal<ResultZ, boolean>>,
  Expect<Equal<ResultY, { field: number }>>
];

// 💡 Bonus: mở rộng (bóc nhiều lớp Promise)
// Nếu bạn có Promise<Promise<string>>,
// bản hiện tại chỉ bóc 1 lớp thôi 👇
// type A = Transform<Promise<Promise<string>>>; // Promise<string>

// Để bóc tất cả các lớp lồng nhau, bạn có thể dùng đệ quy:

// type TransformDeep<A> = A extends Promise<infer R> ? TransformDeep<R> : A;

// type T1 = TransformDeep<Promise<Promise<string>>>; // string ✅