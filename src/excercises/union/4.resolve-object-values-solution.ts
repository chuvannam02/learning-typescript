/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 10:58 AM
 * @File: 4.resolve-object-values-solution.ts
 */

// Solution
// Phân tích yêu cầu bài toán
// file: resolve-object-values => từ value của object lấy ra key à?

import type {Equal, Expect} from "@/type-utils";

export const notification = {
    ALERT: "alert",
    WARNING: "warning",
    DANGER: "danger",
} as const;

type Notification = typeof notification;

type NotifcationAlert = Notification["ALERT"];

// @ts-ignore
type tests = [Expect<Equal<NotifcationAlert, "alert">>];

// 🧠 Cách 2 — Dùng keyof kết hợp Extract
// Giả sử bạn muốn lấy type của một giá trị theo điều kiện động, ví dụ khi key có thể thay đổi.
// type Notification = typeof notification;
type GetValueByKey<K extends keyof Notification> = Notification[K];
// @ts-ignore
type NotificationAlert1 = GetValueByKey<"ALERT">; // "alert"

// 🧠 Cách 4 — Dùng mapped type để đảo key–value
// Nếu bạn muốn truy cập ngược (từ "alert" → "ALERT"), có thể đảo lại:

type ReverseMap<T extends Record<string, string>> = {
    [V in keyof T as T[V]]: V;
};

type Reversed = ReverseMap<typeof notification>;
/*
type Reversed = {
  alert: "ALERT";
  warning: "WARNING";
  danger: "DANGER";
}
*/
// @ts-ignore
type NotificationAlertV4 = Reversed["alert"]; // "ALERT"

// @ts-ignore
function getNotificationValue<T extends Record<string, string>>(obj: T, key: keyof T) {
    return obj[key];
};
