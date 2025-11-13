/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 11:31 PM
 * @File: 6.deep-nullable-solution.ts
 */

// Solution
// Phân tích bài toán:
// file: deep-nullable => Cho phép object chứa các properties có thể có giá trị null?
// Nhìn test case chắc dùng union thêm vào type của các value tương ứng với key trong object type à?
import type {Equal, Expect} from "@/type-utils";

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// type DeepNullable<T> = {
//     [K in keyof T]: {
//         [P in K]: null
//     }
// }[keyof T];
// Tự làm: đáp án sai vì type đang là:
// type DeepNullable<ExampleType> =
//     | { name: null }
//     | { age: null }
//     | { isStudent: null };

// Trong khi expected result là:
// { name: null; age: null; isStudent: null }

// Đơn giản nhất là như này
// type DeepNullable<T> = {
//     [K in keyof T]: null;
// };

// Đề bài có chữ deep-nullable, nghĩa là các object lồng nhau cũng được nullable hóa.
type DeepNullable<T> = {
    [K in keyof T]:
    T[K] extends object
        ? DeepNullable<T[K]> | null
        : T[K] | null;
};
// 🧠 Giải thích:
// Nếu T[K] là object (vd: nested object, array, record, ...):
// Áp dụng lại DeepNullable<T[K]> → đệ quy
// Rồi cho phép giá trị null
// Ngược lại, nếu là primitive (string, number, boolean, v.v.) thì thêm | null

type ExampleType = {
    name: string;
    age: number;
    isStudent: boolean;
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type NullableExample = DeepNullable<ExampleType>;

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Tests = Expect<
// @ts-ignore
    Equal<DeepNullable<ExampleType>, { name: null; age: null; isStudent: null }>
>;

// @ts-ignore
type DeepNullableOptional<T> = {
    [K in keyof T]?: T[K] extends object
        ? DeepNullableOptional<T[K]> | null
        : T[K] | null;
};
