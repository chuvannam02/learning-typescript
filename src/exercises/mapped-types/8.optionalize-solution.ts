/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 11:56 PM
 * @File: 8.optionalize-solution.ts
 */
import type {Equal, Expect} from "@/type-utils";

// SOlution

// Phân tích bài toán:
// file: optionalize => “biến một số property trong type thành optional hoặc cho phép chúng có thể undefined”.
// Xem xét test case: <T, V> => V là type gì thì giữ nguyên
// Các key trong properties còn lại trong object thì thêm union | undefined ?

// @ts-ignore
type Optionalize<T, V> = {
    [K in keyof T]: K extends V ? T[K] : T[K] | undefined;
};

type ExampleType = { name: string; age: number; email: string };

// Test case
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type OptionalNameAndAge = Expect<
// @ts-ignore
    Equal<
        Optionalize<ExampleType, "name" | "age">,
        {
            name: string;
            age: number;
            email: string | undefined;
        }
    >
>;
// type OptionalNameAndAge = {
//   name: string;
//   age: number;
//   email: string | undefined;
// }

// 🧠 3️⃣ Phân biệt 2 hướng mở rộng
// Từ bài toán này, có 2 hướng nâng cao quan trọng mà bạn có thể thử:

// 🟣 (A) Optionalize theo nghĩa “optional property” (dùng ?)
// Thay vì | undefined, bạn có thể biến property thành optional thật sự bằng ?.
type OptionalizeProps<T, V extends keyof T> = {
    [K in keyof T as K extends V ? never : K]?: T[K];
} & {
    [K in Extract<keyof T, V>]: T[K];
};
// @ts-ignore
type Result = OptionalizeProps<ExampleType, "name" | "age">;
// {
//   name: string;
//   age: number;
//   email?: string;
// }

// ====================================================================================================================
// 🟢 (B) Tổng quát hóa — Deep Optionalize (đệ quy)
// Nếu object có nhiều cấp lồng nhau, bạn có thể mở rộng để cho phép undefined ở mọi cấp con.
type DeepOptionalize<T, V extends keyof T> = {
    [K in keyof T]: K extends V
        ? T[K]
        : T[K] extends object
            ? DeepOptionalize<T[K], keyof T[K]> | undefined
            : T[K] | undefined;
};
type Nested = {
    name: string;
    profile: {
        address: string;
        age: number;
    };
};

// @ts-ignore
type DeepOptional = DeepOptionalize<Nested, "name">;
/*
{
  name: string;
  profile: {
    address: string | undefined;
    age: number | undefined;
  } | undefined;
}
*/
