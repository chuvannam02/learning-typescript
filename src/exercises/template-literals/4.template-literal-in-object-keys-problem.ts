/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 8:52 AM
 * @File: 4.template-literal-in-object-keys-problem.ts
 */
import type {Equal, Expect} from "@/type-utils";

// Problem
// Phân tích yêu cầu bài toán:
// file: template-literal-in-object-keys:  => Sử dụng template literal để sinh ra properties trong type object
// Xem xét test case
// => Tổ hợp các thành phần sẵn có để tạo ra danh sách key cho object

// @ts-ignore
type TemplateLiteralKey = `${"user" | "post" | "comment"}${"Id" | "Name"}`;

type ObjectOfKeys = unknown;

// @ts-ignore
type tests = [
// @ts-ignore
    Expect<
// @ts-ignore
        Equal<
            ObjectOfKeys,
            {
                userId: string;
                userName: string;
                postId: string;
                postName: string;
                commentId: string;
                commentName: string;
            }
        >
    >
];
