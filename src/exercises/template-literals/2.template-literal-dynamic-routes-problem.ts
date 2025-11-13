/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 8:21 AM
 * @File: 2.template-literal-dynamic-routes-problem.ts
 */
import type {Equal, Expect} from "@/type-utils";

// Problem
// Phân tích bài toán:
// file: template-literal-dynamic-routes => Sử dụng Template Literal Types
// Xem test case thì kiểm tra xem route có thuộc dạng /.../.../..../.... hay không thay vì chỉ 1 cấp /...

// @ts-ignore
type Routes = "/users" | "/users/:id" | "/posts" | "/posts/:id";
// cần kết hợp conditional type + template literal inference (infer) để lọc ra các route có dạng /:something/:param.
type DynamicRoutes<T extends string> = T extends `/${string}/:${string}` ? T : never;

type OnlyDynamicRoutes = DynamicRoutes<Routes>;

// @ts-ignore
type tests = [Expect<Equal<OnlyDynamicRoutes, "/users/:id" | "/posts/:id">>];

// ⚡ 5️⃣ Tổng quát hóa bài toán
// 🟣 (A) Trích tất cả dynamic route params
// Nếu bạn muốn lấy luôn tên param (ví dụ "id"):
type ExtractRouteParam<T> =
    T extends `${string}/:${infer Param}` ? Param : never;

// @ts-ignore
type DynamicParams = ExtractRouteParam<Routes>;
// "id"

// 🟢 (B) Cho phép nhiều tham số (ví dụ /users/:id/:action)
type ExtractAllParams<T> =
    T extends `${string}/:${infer Param}/${infer Rest}`
        ? Param | ExtractAllParams<`/${Rest}`>
        : T extends `${string}/:${infer Last}`
            ? Last
            : never;

type MultiParamRoute = "/users/:id/:action";
// @ts-ignore
type Params = ExtractAllParams<MultiParamRoute>;
// "id" | "action"
