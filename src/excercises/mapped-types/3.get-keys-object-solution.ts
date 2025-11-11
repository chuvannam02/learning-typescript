/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 10:38 PM
 * @File: 3.get-keys-object-solution.ts
 */

// SOlution

import type {Equal, Expect} from "@/type-utils";

// type sẵn rồi nên chẳng cần sử dụng typeof nữa đâu
type Obj = {
    a: string;
    b: string;
    c: number;
    d: number;
};

// Ý tưởng giải quyết bài toán này
// Duyệt qua các key trong properties của object type (keyof)
// Kiểm tra Object[Key] xem có extends string hay không?
// Nếu extends thì dùng union còn nếu không thì không thêm
type StringKeys<T> = {
    [K in keyof T]: T[K] extends string ? K : never
}[keyof T];
// 💡 Giải thích:
//     - K in keyof T — Duyệt qua từng key trong T.
    // - T[K] extends string ? K : never — Nếu value tại key đó có kiểu là string, thì giữ lại K, còn không thì loại bỏ (never).
    // - [keyof T] — Lấy ra union của tất cả các giá trị sau khi mapped type đã được xử lý.

type StringKeysOfObj = StringKeys<Obj>; // type StringKeysOfObj = "a" | "b";

// Tên file là get-keys-object
// Vấn đề trong bài toán này cần được giải quyết:
// Ý là đang có 1 type là object
// Mục tiêu là chuyển hết key trong các properties của object thành type mới (Dùng union để hoặc key này hoặc key kia)
// Thêm vào đó: Dựa vào type StringKeys cho sẵn => Mục đích của đề bài là chỉ trích xuất ra những key trong properties nào mà value của các key đó có type là string
// => Thêm hết vào trong type mới và kết hợp với nhau bằng cách sử dụng union

// @ts-ignore
type tests = [Expect<Equal<StringKeysOfObj, "a" | "b">>];

// Mở rộng bài toán
// Tạo thêm NumberKeys<T>
type NumberKeys<T> = {
    [K in keyof T]: T[K] extends number ? K : never
}[keyof T];
// @ts-ignore
type NumberKeysOfObj = NumberKeys<Obj>;

// Tạo thêm BooleanKeys<T>
type BooleanKeys<T> = {
    [K in keyof T]: T[K] extends boolean ? K : never
}[keyof T];
// @ts-ignore
type BooleanKeyOfObj = BooleanKeys<Obj>;

// @ts-ignore
// Tổng quát hoá bài toán cho type bất kỳ
type KeyByValueType<T, V> = {
    [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];
// type StringKeysOfObj = KeysByValueType<Obj, string>; // "a" | "b"
// type NumberKeysOfObj = KeysByValueType<Obj, number>; // "c" | "d"
