/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 8:53 AM
 * @File: 4.template-literal-in-object-keys-solution.ts
 */

// Solution
// Phân tích yêu cầu bài toán:
// file: template-literal-in-object-keys:  => Sử dụng template literal để sinh ra properties trong type object
// Xem xét test case
// => Tổ hợp các thành phần sẵn có để tạo ra danh sách key cho object

type TemplateLiteralKey = `${"user" | "post" | "comment"}${"Id" | "Name"}`;

type ObjectOfKeys = {
    [K in TemplateLiteralKey]: string
};

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
