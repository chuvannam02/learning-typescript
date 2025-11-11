/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 10:38 PM
 * @File: 3.get-keys-object-problem.ts
 */

// Problem

import type {Equal, Expect} from "@/type-utils";

type Obj = {
    a: string;
    b: string;
    c: number;
    d: number;
};

// @ts-ignore
type StringKeys<T> = unknown;

type StringKeysOfObj = StringKeys<Obj>;

// Tên file là get-keys-object
// Vấn đề trong bài toán này cần được giải quyết:
// Ý là đang có 1 type là object
// Mục tiêu là chuyển hết key trong các properties của object thành type mới (Dùng union để hoặc key này hoặc key kia)
// Thêm vào đó: Dựa vào type StringKeys cho sẵn => Mục đích của đề bài là chỉ trích xuất ra những key trong properties nào mà value của các key đó có type là string
// => Thêm hết vào trong type mới và kết hợp với nhau bằng cách sử dụng union

// @ts-ignore
type tests = [Expect<Equal<StringKeysOfObj, "a" | "b">>];
