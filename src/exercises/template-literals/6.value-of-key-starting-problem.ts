/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 9:25 AM
 * @File: 6.value-of-key-starting-problem.ts
 */

// Problem

// Phân tích yêu cầu bài toán:
// file: value-of-key-starting => Lọc value tương ứng key bắt đầu bằng ký tự ...
// Xem xét expected results:
// Như vậy kết quả cuối cùng cần string union những value có key bắt đầu bằng chữ cái A

export type Obj = {
    a: "a";
    a2: "a2";
    a3: "a3";
    b: "b";
    b1: "b1";
    b2: "b2";
};

// @ts-ignore
type ValuesOfKeysStartingWithA<Obj> = unknown;

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type NewUnion = ValuesOfKeysStartingWithA<Obj>;

// Expected Result:
// type NewUnion = "a" | "a2" | "a3";
