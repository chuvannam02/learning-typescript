/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 11:16 PM
 * @File: 5.transform-union-to-union-problem.ts
 */
import type {Equal, Expect} from "@/type-utils";

// Problem

// Phân tích bài toán hiện tại
// file: transform-union-to-union => sẽ biến đổi kiểu union thành kiểu union khác?
// Nhìn test case bên dưới thì tuỳ vào type thì sẽ thêm 1 property tưởng ứng
// Ví dụ:
// - Nếu type: "user" => thêm userId: string
// - Nếu type: "post" => thêm postId: string
// - Nếu type: "comment" => thêm commentId: string

export type Entity =
    | {
    type: "user";
}
    | {
    type: "post";
}
    | {
    type: "comment";
};

type EntityWithId = unknown;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const result: EntityWithId = {
    type: "comment",
    commentId: "123",
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
type tests = [
    // @ts-ignore
    Expect<
        // @ts-ignore
        Equal<
            EntityWithId,
            | ({
            type: "user";
        } & Record<"userId", string>)
            | ({
            type: "post";
        } & Record<"postId", string>)
            | ({
            type: "comment";
        } & Record<"commentId", string>)
        >
    >
];
