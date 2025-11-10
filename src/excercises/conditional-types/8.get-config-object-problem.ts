// Problem

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

declare function getUser(config: Config): User;

// test cases
const user = getUser({ name: true, lastname: false });
user.name; // this field should be non-optional
user.lastname; // this field should not be there and we should have compile error 🛑

const user2 = getUser({ name: true, lastname: true });
user2.name; // this field should be non-optional
user2.lastname; // this field should be non-optional

const user3 = getUser({ name: false, lastname: true });
user3.name; // this field should not be there and we should have compile error 🛑
user3.lastname; // this field should be non-optional

const user4 = getUser({ name: false, lastname: false });
user4; // user4 should be empty object {}