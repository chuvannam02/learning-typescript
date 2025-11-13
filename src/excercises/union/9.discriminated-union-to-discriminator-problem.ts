/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:33 AM
 * @File: 9.discriminated-union-to-discriminator-problem.ts
 */

// discriminated-union-to-discriminator-problem.ts
// 🧩 Problem:
// Cho một discriminated union gồm nhiều object có cùng key phân biệt ("type"),
// hãy viết type `DiscriminatorValue<T>` để trích xuất tất cả giá trị có thể của key phân biệt đó.
//
// Ví dụ:
// type Event =
//   | { type: "click"; event: MouseEvent }
//   | { type: "focus"; event: FocusEvent }
//   | { type: "keydown"; event: KeyboardEvent }
//
// 👉 Kết quả mong muốn:
// type EventType = DiscriminatorValue<Event, "type">;
// // => "click" | "focus" | "keydown"

import type { Equal, Expect } from "@/type-utils";

// Input
export type Event =
    | { type: "click"; event: MouseEvent }
    | { type: "focus"; event: FocusEvent }
    | { type: "keydown"; event: KeyboardEvent };

// 🧠 Viết type này:
// @ts-ignore
type DiscriminatorValue<T, K extends keyof any> = unknown;

// ✅ Kết quả mong muốn
type EventType = DiscriminatorValue<Event, "type">;

// @ts-ignore
type tests = [Expect<Equal<EventType, "click" | "focus" | "keydown">>];
