/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 9:26 AM
 * @File: 6.value-of-key-starting-solution.ts
 */

// Solution

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

type StartWithA<T> = T extends `a${infer R}` ? `a${R}` : never;
// @ts-ignore
type Demo = StartWithA<keyof Obj>;
type ValuesOfKeysStartingWithA<Obj> = {
    [K in keyof Obj as `${Extract<keyof Obj, StartWithA<keyof Obj>>}`]: string;
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type NewUnion = keyof ValuesOfKeysStartingWithA<Obj>;

// Expected Result:
// type NewUnion = "a" | "a2" | "a3";
