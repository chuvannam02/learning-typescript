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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const book4: Partial<BookRequired> = {
    name: "string"
}

// Cấu trúc này gọi là Mapped Type
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 4. Extract<Type, Union>: nó trả về một Union Type mới chỉ bao gồm những thành viên từ Type mà thỏa mãn điều kiện là nằm trong hoặc tương thích với Union.
// Ví dụ: Lọc các Event Handler (Hàm xử lý sự kiện)
// Trong các thư viện hoặc framework UI (như React, Vue), các components thường có nhiều loại props khác nhau, bao gồm cả data props và event handler props (thường là các hàm).
type ButtonProps = {
    // Data props
    text: string;
    isDisabled: boolean;

    // Event handler props (các hàm)
    onClick: (event: MouseEvent) => void;
    onKeyDown: (event: KeyboardEvent) => void;

    // Optional props
    className?: string;
    style?: React.CSSProperties;
};
// => Sử dụng Extract để Lọc các Event Handlers
// Chúng ta chỉ muốn tạo một kiểu mới chứa duy nhất các thuộc tính là hàm (function) để dễ dàng xử lý, bind (gắn) hoặc truyền chúng đi.
// Chúng ta sử dụng Extract nhưng cần một bước trung gian vì Extract chỉ hoạt động trực tiếp trên Union Members, chứ không phải các thuộc tính của một Object Type.
// Bước 1: Chuyển đổi Object sang Union (Sử dụng keyof và Lookup)
// Đầu tiên, chúng ta cần biến các thuộc tính của ButtonProps thành một Union của các kiểu thuộc tính (string | boolean | ((...) => void) | undefined | ...)
// Lấy ra Union của tất cả các kiểu thuộc tính (values) trong ButtonProps
type PropValues = ButtonProps[keyof ButtonProps];
/*
type PropValues =
    string |
    boolean |
    ((event: MouseEvent) => void) | // Đây là kiểu hàm (Function)
    ((event: KeyboardEvent) => void) | // Đây là kiểu hàm (Function)
    (string | undefined) |
    (React.CSSProperties | undefined)
*/

// Bước 2: Lọc Union Type bằng Extract
// Bây giờ, chúng ta có thể sử dụng Extract để trích xuất chỉ những thành viên là Function từ Union PropValues:
// Trích xuất chỉ các kiểu Function
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
type HandlerTypes = Extract<PropValues, Function>;

/*
type HandlerTypes =
    ((event: MouseEvent) => void) |
    ((event: KeyboardEvent) => void)
*/

// Bước 3: Tái cấu trúc kiểu (Kết quả sử dụng trong thực tế)
// Sau khi có HandlerTypes, chúng ta có thể làm nhiều việc, ví dụ như tạo một kiểu chỉ chứa tên của các Event Handlers (sử dụng keyof kết hợp với Extract một lần nữa) để dễ dàng lặp qua:

// Tái sử dụng: Lọc ra các thuộc tính (keys) mà có kiểu thuộc tính là HandlerTypes
type HandlerKeys = keyof {
    [K in keyof ButtonProps as ButtonProps[K] extends HandlerTypes ? K : never]: ButtonProps[K];
};

// type HandlerKeys = "onClick" | "onKeyDown"
export {};
