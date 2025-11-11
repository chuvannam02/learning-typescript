/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 11:16 PM
 * @File: 5.transform-union-to-union-solution.ts
 */
import type {Equal, Expect} from "@/type-utils";

// Solution

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

type EntityWithId = Entity extends { type: infer T }
    ? T extends "user"
        ? Entity & Record<"userId", string>
        : T extends "post"
            ? Entity & Record<"postId", string>
            : T extends "comment"
                ? Entity & Record<"commentId", string>
                : never
    : never;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const result: EntityWithId = {
    type: "comment",
    commentId: "123",
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
type tests = [
    Expect<
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

// 🧠 Cách 1 — Mapped type kết hợp Extract
type EntityType = Entity["type"]; // "user" | "post" | "comment"

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EntityWithIdV1 = {
    [T in EntityType]: Extract<Entity, { type: T }> & Record<`${T}Id`, string>;
}[EntityType];
// ✅ Giải thích:

// [T in EntityType] → Mapped type qua từng "user", "post", "comment".

// Extract<Entity, { type: T }> → Lấy ra nhánh tương ứng từ union Entity.

// Record<\${T}Id`, string>` → Thêm property động.

// Cuối cùng [...] [EntityType] → lấy union của value types.

// 👉 Đây là Mapped Type 100%, không cần extends hay infer.
//     Nó cực kỳ phổ biến khi muốn biến đổi union bằng cách map qua “tag field”.

// ⚙️ Cách 2 — Mapped Type từ đối tượng “type map”
// Giả sử bạn định nghĩa 1 “mapping” rõ ràng giữa type và id key:

type IdMap = {
    user: "userId";
    post: "postId";
    comment: "commentId";
};

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EntityWithIdV2 = {
    [K in keyof IdMap]: Extract<Entity, { type: K }> & Record<IdMap[K], string>;
}[keyof IdMap];

// ⚡ Cách 3 — Dựa trên “Remapping keys” trong Mapped Type (TS 4.1+)
// TypeScript hỗ trợ “remap key” ngay trong mapped type, nên ta có thể viết ngắn hơn:

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type EntityWithIdV3 = {
    [E in Entity as E["type"]]: E & Record<`${E["type"]}Id`, string>;
}[Entity["type"]];

// Giải thích:

// [E in Entity as E["type"]]:

// E in Entity → lặp qua từng nhánh của union.

// as E["type"] → remap key thành giá trị literal "user" | "post" | "comment".

// Mỗi E được nối thêm Record<\${E["type"]}Id`, string>`.

// [Entity["type"]] ở cuối để biến { user: ..., post: ..., comment: ... } thành union.
