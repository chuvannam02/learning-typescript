// Solution

import type { Equal, Expect } from "@/type-utils";

// Generic nâng cao
const makeStatus = <T extends string[]>(statuses: T): Array<T[number]> => {
  return statuses as Array<T[number]>;
};

// 🔹 Giải thích

// <T extends readonly string[]> → cho phép bạn truyền as const để giữ literal types

// T[number] → lấy union literal của tất cả phần tử trong tuple

// Array<T[number]> → kiểu kết quả là dynamic array nhưng vẫn giữ union literal type

// statuses as Array<T[number]> → type assertion để TypeScript hiểu đây là Array<union> thay vì readonly tuple

// Sử dụng
const statuses = makeStatus(["INFO", "DEBUG", "ERROR", "WARNING"] as const);

// Test case
type tests = [
  Expect<Equal<typeof statuses, Array<"INFO" | "DEBUG" | "ERROR" | "WARNING">>>
];