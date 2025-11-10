// Solution

import type { Equal, Expect } from "@/type-utils";

const returnWhatIPassIn = <const T>(t: T) => {
  return t;
};

const one = returnWhatIPassIn(1);
const matt = returnWhatIPassIn("matt");
const x = returnWhatIPassIn({ a: 1 }); 
// ❌ T bị widen thành { a: number }
// Nếu bạn muốn giữ nguyên literal sâu (deep literal) thì:
// const returnWhatIPassIn = <const T>(t: T) => t;

// → Sử dụng const trước generic để bật chế độ “as const inference mode”.

type tests = [Expect<Equal<typeof one, 1>>, Expect<Equal<typeof matt, "matt">>];

// 🧩 4️⃣ Hàm tự động clone để tránh mutation
// Mở rộng logic runtime:

// const returnWhatIPassIn = <T>(t: T): T => structuredClone(t);
// → Dạng này vẫn giữ kiểu T, nhưng tạo ra bản sao an toàn (đặc biệt khi T là object hoặc array).

// 🧩 5️⃣ Phiên bản “identity transformer” có callback
// Ví dụ bạn muốn thêm “transformer function” mà vẫn giữ được type inference chính xác:

// const returnWhatIPassIn = <T, R>(t: T, transform?: (value: T) => R) =>
//   transform ? transform(t) : t;

// ✅ Hoạt động:

// const x = returnWhatIPassIn("hello"); // "hello"
// const y = returnWhatIPassIn(1, n => n * 2); // number

// 🧩 6️⃣ Phiên bản hỗ trợ tuple / rest parameter

// Cho phép truyền nhiều giá trị vào:

// const returnWhatIPassIn = <T extends any[]>(...args: T) => args;

// → Tự động infer tuple:

// const x = returnWhatIPassIn(1, "a", true);
// typeof x = [1, "a", true]