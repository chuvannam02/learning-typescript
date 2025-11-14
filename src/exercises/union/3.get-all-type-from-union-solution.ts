/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 10:49 AM
 * @File: 3.get-all-type-from-union-solution.ts
 */

// Solution
// Phân tích yêu cầu bài toán
// file: get-all-type-from-union => Trích xuất tất cả các key "type" trong object

import type {Equal, Expect} from "@/type-utils";

// Type gồm nhiều type object kết hợp với nhau bằng union |
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
type Prop<T, K extends string> = T extends { [P in K]: infer V} ? V : never;
type AwardType2 = Prop<Ranking, "type">; // "best" | "good" | "normal"

// Cần lọc tất cả theo key type
// @ts-ignore
type AwardType = Ranking["type"];

// @ts-ignore
type tests = [Expect<Equal<AwardType2, "best" | "good" | "normal">>];
