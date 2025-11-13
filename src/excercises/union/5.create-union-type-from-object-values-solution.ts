/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:07 AM
 * @File: 5.create-union-type-from-object-values-solution.ts
 */

// Solution
// Phân tích yêu cầu bài toán
// file: create-union-type-from-object-values => tạo ra union type từ object values
// Xem xét các test case được triển khai
// => từ 1 object => Lấy ra danh sách values dựa trên key trong object (ngoại trừ key "alert" còn lại thì sử dụng hết)

import type {Equal, Expect} from "@/type-utils";

export const notification = {
    ALERT: "alert",
    WARNING: "warning",
    DANGER: "danger",
} as const;

type Notification = typeof notification;

type NotificationNeededKeys = Exclude<keyof Notification, "ALERT">;

export type NotificationWD = Omit<
    Notification,
    "ALERT"
>[NotificationNeededKeys];

// type NotificationWD = "warning" | "danger"
// @ts-ignore
type tests = [Expect<Equal<NotificationWD, "warning" | "danger">>];
