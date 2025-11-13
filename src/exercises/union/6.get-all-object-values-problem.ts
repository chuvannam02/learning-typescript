import type {Equal, Expect} from "@/type-utils";

/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:13 AM
 * @File: 6.get-all-object-values-problem.ts
 */

// Problem
// Phân tích yêu cầu bài toán
    // file: get-all-object-values => lấy tất cả các value trong type object

export const notification = {
        ALERT: "alert",
        WARNING: "warning",
        DANGER: "danger",
    } as const;

type Notification = unknown;

// @ts-ignore
type tests = [Expect<Equal<Notification, "alert" | "warning" | "danger">>];
