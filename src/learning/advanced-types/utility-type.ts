/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/28/2025
 * @Time: 9:53 PM
 * @File: utility-type.ts
 */

// 1. Required<Type>
type Books =  {
    name?: string,
    price?: number,
    image?: string
};

type BookRequired = Required<Books>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const book1: Books = {
    name: "Harry Porter"
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// TS2739: Type { name: string; } is missing the following properties from type Required<Books>: price, image
const book2: BookRequired = {
// => Báo lỗi ngay lập tức vì thiếu mất 2 trường bắt buộc là price và image
    name: "Machine Learning"
};

// =======================================================================================================
// 2. Pick<Type, Keys>
type BookOption =  Pick<Books, "name" | "image">;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const book3: BookOption = {
    name: "One Piece",
    image: "abc"
};

// 3. Partial<Type>: Biến properties bắt buộc thành không bắt buộc (optional)
const book4: Partial<BookRequired> = {
    name: "string"
}

// Cấu trúc này gọi là Mapped Type
type Partial<T> = {
    [P in keyof T]?: T[P];
};

export {};
