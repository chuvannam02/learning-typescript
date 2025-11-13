/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 10:46 AM
 * @File: 2.exclude-from-union-problem.ts
 */

// Solution
// Phân tích yêu cầu bài toán
// file; exclude-from-union => Sử dụng Exclude
// Xem xét test case => Yêu cầu lọc lấy những type khác type: "best"

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

type NotRankingBest = Exclude<Ranking, { type: "best" }>;

// @ts-ignore
type tests = [
// @ts-ignore
    Expect<
// @ts-ignore
        Equal<
            NotRankingBest,
            | {
            type: "good";
            award: "Silver";
        }
            | {
            type: "normal";
            award: "bronze";
        }
        >
    >
];
