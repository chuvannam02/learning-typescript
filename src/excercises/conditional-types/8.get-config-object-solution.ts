// Solution

// TypeScript advanced conditional mapping rất thực tế (thường gặp trong form builder, config-driven system).

// Here types should remain the same ❄
export type Config = {
  name: boolean;
  lastname: boolean;
};
export type User = {
  name?: string;
  lastname?: string;
};

// Here declaration to be changed 🔥
// Bài toán:
// Truyền params config có type Config trong đó chứa properties name, lastName chứa giá trị boolean

// Kết quả mong muốn
// getUser({ name: true, lastname: false }) 
// ⟹ { name: string }

// và nếu config = { name: false, lastname: true }
// ⟹ { lastname: string }.

// Tức là:

// Nếu config[key] === true → field đó bắt buộc có mặt (required).

// Nếu config[key] === false → field đó không tồn tại trong User.

// 💡 Ý tưởng

// 👉 Ta cần map lại type của User dựa trên Config truyền vào.

// Cụ thể:

// Config[K] là true → giữ lại field K từ User và bắt buộc (Required).

// Config[K] là false → loại bỏ field đó khỏi User.

// Utility: Lọc ra key có giá trị true
// 🔍 Giải thích từng bước
// 1. TrueKeys<C>

// Với C = { name: true, lastname: false },
// TrueKeys<C> = "name"

// type TrueKeys<C> = {
//   [K in keyof C]: C[K] extends true ? K : never
// }[keyof C];


// ⟹ Đây là kỹ thuật map + extract union.
type TrueKeys<T> = {
    [K in keyof T]: T[K] extends true ? K : never
}[keyof T]

// declare function getUser(config: Config): User;
// Hàm getUser
// 2. getUser return type

// Chỉ giữ lại những key có true.

// Dùng NonNullable<User[K]> để đảm bảo không bị undefined.
// Dùng Type Assertion
// declare function getUser<C extends Config>(
//   config: C
// ): {
//   [K in TrueKeys<C>]: NonNullable<User>[Extract<K, keyof User>]
// };

type FilteredUser<C, U> = {
  [K in Extract<TrueKeys<C>, keyof U>]: NonNullable<U[K]>;
};

declare function getUser<C extends Record<string, boolean>>(
  config: C
): FilteredUser<C, User>;

// ⚙️ Bonus: mở rộng dễ dàng
// Bạn có thể tái sử dụng logic này với bất kỳ Config và User nào:
type DynamicUser<C, U> = {
  [K in keyof C as C[K] extends true ? K : never]: NonNullable<U[K]>
};

// test cases
const user = getUser({ name: true, lastname: false });
const name = user.name; // this field should be non-optional
const lastName = user.lastname; // this field should not be there and we should have compile error 🛑

const user2 = getUser({ name: true, lastname: true });
user2.name; // this field should be non-optional
user2.lastname; // this field should be non-optional

const user3 = getUser({ name: false, lastname: true });
user3.name; // this field should not be there and we should have compile error 🛑
user3.lastname; // this field should be non-optional

const user4 = getUser({ name: false, lastname: false });
user4; // user4 should be empty object {}