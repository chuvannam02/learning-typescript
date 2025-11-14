/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:14 AM
 * @File: 6.get-all-object-values-solution.ts
 */

// SOlution
// Phân tích yêu cầu bài toán
    // file: get-all-object-values => lấy tất cả các value trong type object

export const notification = {
        ALERT: "alert",
        WARNING: "warning",
        DANGER: "danger",
    } as const;

type NotificationType = typeof notification;
type Notification = NotificationType[keyof NotificationType];

// @ts-ignore
type tests = [Expect<Equal<Notification, "alert" | "warning" | "danger">>];
