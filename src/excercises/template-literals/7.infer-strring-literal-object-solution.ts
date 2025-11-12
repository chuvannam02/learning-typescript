/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/12/2025
 * @Time: 9:37 AM
 * @File: 7.infer-strring-literal-object-solution.ts
 */

// Solution

// Phân tích yêu cầu bài toán
// file: infer-string-literal-object
// Xem xét expected result:
// => Có 1 type object cần loại bỏ string maps trong key của object này

type MapConstant = "maps";

interface ApiData {
    "maps:longitude": string;
    "maps:latitude": string;
}

type StartWithMapConstant<T> = T extends `${MapConstant}:${infer R}` ? R : never;

// Ở đây bạn dùng key remapping (điểm mạnh của mapped types):

// as StartWithMapConstant<K>:
// → thay đổi tên key từ "maps:longitude" → "longitude"
// → nếu StartWithMapConstant<K> là never, key đó bị loại bỏ hoàn toàn.

// Kết quả:

// type DesiredShape = {
//     longitude: string;
//     latitude: string;
// }
type RemoveMapsFromObj<T> = {
    [K in keyof T as StartWithMapConstant<K>]: T[K];
};

// @ts-ignore
type DesiredShape = RemoveMapsFromObj<ApiData>;

// Expected Result:
// type DesiredShape = {
//   "longitude": string;
//   "latitude": string;
// }

// ====================================================================================================================
// 🚀 2. Nâng cấp: Cho phép nhiều prefix khác nhau
// Ví dụ API có thể trả về:

// interface ApiData {
//     "maps:longitude": string;
//     "maps:latitude": string;
//     "user:id": number;
//     "user:name": string;
// }

// Bạn muốn loại bỏ prefix "maps:" hoặc "user:".
// → Giải pháp:
type Prefixes = "maps" | "user";

type RemovePrefix<T> = T extends `${infer P}:${infer R}`
    ? P extends Prefixes
        ? R
        : never
    : never;

type RemovePrefixedKeys<T> = {
    [K in keyof T as RemovePrefix<K>]: T[K];
};

// ✅ Kết quả:
// @ts-ignore
type Result2 = RemovePrefixedKeys<ApiData>;
// {
//   longitude: string;
//   latitude: string;
//   id: number;
//   name: string;
// }

// ====================================================================================================================
// ⚙️ 3. Tổng quát hoá: Cho phép truyền prefix động qua generic
type RemovePrefixFromObj<
    T extends Record<string, any>,
    P extends string
> = {
    [K in keyof T as K extends `${P}:${infer R}` ? R : K]: T[K];
};
// → Áp dụng:

// type ApiData = {
//     "maps:longitude": string;
//     "maps:latitude": string;
//     "user:id": number;
// };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type MapsRemoved = RemovePrefixFromObj<ApiData, "maps">;
// { longitude: string; latitude: string; user:id: number }

// ====================================================================================================================
// 🧩 4. Nâng cao hơn: Tự động bỏ prefix có trong key (dù không biết trước)
// Bài này cực hay — dùng infer để tự động phát hiện và bỏ prefix (phần trước dấu :):

type AutoRemovePrefix<T> = {
    [K in keyof T as K extends `${infer _}:${infer R}` ? R : K]: T[K];
};

// → Áp dụng:

// type ApiData = {
//     "maps:longitude": string;
//     "maps:latitude": string;
//     "user:id": number;
//     "post:title": string;
//     "timestamp": number;
// };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Result4 = AutoRemovePrefix<ApiData>;
// {
//   longitude: string;
//   latitude: string;
//   id: number;
//   title: string;
//   timestamp: number; // không có ":" nên giữ nguyên
// }

// ====================================================================================================================
// 🧮 5. Cấp độ “Expert”: Bỏ prefix và nhóm theo prefix
// Nếu muốn phân nhóm key theo prefix (thay vì bỏ nó đi), ta có thể làm:

type SplitByColon<K extends string> =
    K extends `${infer P}:${infer R}` ? [P, R] : ["none", K];

type GroupByPrefix<T> = {
    [P in SplitByColon<keyof T & string>[0]]: {
        [K in keyof T as SplitByColon<K & string>[0] extends P
            ? SplitByColon<K & string>[1]
            : never]: T[K];
    };
};

// → Áp dụng:

// type ApiData = {
//     "maps:longitude": string;
//     "maps:latitude": string;
//     "user:id": number;
//     "timestamp": number;
// };

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Grouped = GroupByPrefix<ApiData>;

// Kết quả:
// type Grouped = {
//     maps: {
//         longitude: string;
//         latitude: string;
//     };
//     user: {
//         id: number;
//     };
//     none: {
//         timestamp: number;
//     };
// };
