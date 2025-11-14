/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 10:49 AM
 * @File: 3.get-all-type-from-union-problem.ts
 */

// Problem
// Phân tích yêu cầu bài toán
// file: get-all-type-from-union => Trích xuất tất cả các key "type" trong object

import type {Equal, Expect} from "@/type-utils";

export type Ranking =
    | {
    type: "best";
    award: "Gold";
}
    | {
    type: "good";
    award: "Silver";
}
    | {
    type: "normal";
    award: "bronze";
};

type AwardType = unknown;

// @ts-ignore
type tests = [Expect<Equal<AwardType, "best" | "good" | "normal">>];
