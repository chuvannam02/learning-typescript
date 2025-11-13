/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:23 AM
 * @File: 8.create-union-from-object-array-problem.ts
 */

// Problem
// Phân tích yêu cầu bài toán
// file: create-union-from-object-array => Từ object array type => tạo ra union type
// Xem xét các test cases: Lọc ra value theo key "pipeapple" type union

import type {Equal, Expect} from "@/type-utils";

// @ts-ignore
const TOPPINGS = [
    {
        name: "pineapple",
        description: "A delicious tropical fruit",
        price: 0.5,
    },
    {
        name: "pepperoni",
        description: "A spicy meat topping",
        price: 0.75,
    },
    {
        name: "anchovy",
        description: "A salty fish topping",
        price: 1.0,
    },
    {
        name: "peppers",
        description: "A colorful vegetable topping",
        price: 0.5,
    },
];

type Toppings = unknown;

// @ts-ignore
type tests = [
    // @ts-ignore
    Expect<Equal<Toppings, "pineapple" | "pepperoni" | "anchovy" | "peppers">>
];
