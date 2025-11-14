/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 11:45 PM
 * @File: 7.immutable-type-solution.ts
 */
// Solution
import type {Equal, Expect} from "@/type-utils";

// Phân tích bài toán
// file: immutable-type => type không thể thay đổi được (Không thêm sửa xoá được => hằng số?)
// Xem xét các test case thì thấy
// {
//     readonly name: string;
//     readonly age: number;
// }

// => Duyệt các properties trong object type => Thêm readonly => chỉ đọc (hằng số)

// @ts-ignore
type Immutable<T> = {
    readonly [K in keyof T]: T[K]
};
// 🧠 Giải thích
// keyof T: lấy danh sách các key của T
// [K in keyof T]: duyệt qua từng key trong T
// readonly trước [K ...]: biến mỗi property thành chỉ đọc
// T[K]: giữ nguyên type của từng property

type ExampleType = { name: string; age: number };

// Test case
// @ts-ignore
type ImmutableExample = Expect<
// @ts-ignore
    Equal<
        Immutable<ExampleType>,
        {
            readonly name: string;
            readonly age: number;
        }
    >
>;

// 💡 Nâng cấp phiên bản tổng quát
// Bạn có thể mở rộng cho nested object — tức là deep immutable:
type DeepImmutable<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepImmutable<T[K]> : T[K];
};

type DeepExample = {
    info: {
        name: string;
        address: {
            city: string;
        };
    };
};

// @ts-ignore
type DeepResult = DeepImmutable<DeepExample>;
/*
{
  readonly info: {
    readonly name: string;
    readonly address: {
      readonly city: string;
    };
  };
}
*/
