/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 10:16 AM
 * @File: 1.extract-from-union-solution.ts
 */

import type {Equal, Expect} from "@/type-utils";

// Solution

// Phân tích yêu cầu bài toán:
// file: extract-from-union => trích xuất type từ union
// Xem xét các test case => trích xuất từ union ra type: "best"

// => extract => thử dùng Extract Utility xem sao

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

type RankingBest = Extract<Ranking, { type: "best" }>;
// @ts-ignore
type tests = [
// @ts-ignore
    Expect<
// @ts-ignore
        Equal<
            RankingBest,
            {
                type: "best";
                award: "Gold";
            }
        >
    >
];
