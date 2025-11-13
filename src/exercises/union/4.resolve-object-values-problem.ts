/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 10:58 AM
 * @File: 4.resolve-object-values-problem.ts
 */

// Problem
// Phân tích yêu cầu bài toán
// file: resolve-object-values => từ value của object lấy ra key à?

import type {Equal, Expect} from "@/type-utils";

export const notification = {
    ALERT: "alert",
    WARNING: "warning",
    DANGER: "danger",
};

type NotifcationAlert = unknown;

// @ts-ignore
type tests = [Expect<Equal<NotifcationAlert, "alert">>];
