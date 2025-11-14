// Solution
// 💡 Kiến thức nền cần nắm

// TypeScript có thể mẫu hoá chuỗi (pattern matching) bằng infer và template literal types:

// Ví dụ:
type Example<T> = T extends `${infer A} ${infer B}` ? `${A}-${B}` : T;
type R = Example<"Hello World">; // "Hello-World"

// Ở đây:

// ${infer A} ${infer B} có nghĩa là: chuỗi có dấu cách ở giữa → chia làm 2 phần.

// ${A}-${B} → thay dấu cách bằng dấu -.

// 1️⃣ Thay thế " " thành "-" cố định (Chỉ 1 ký tự):
type ReplaceSpaceWithDash<T> = T extends `${infer A} ${infer B}` ? `${A}-${B}` : T;
type Name = ReplaceSpaceWithDash<"Emmylou Harris">;
// Expected Output:  ^? "Emmylou-Harris"
type Name = "Emmylou-Harris"

// 2️⃣ Thay thế ký tự tuỳ chọn (Chỉ 1 ký tự):
type Replace<S extends string, From extends string, To extends string> = S extends `${infer Head}${From}${infer Tail}` ? `${Head}${To}${Tail}` : S;
type DashName = Replace<"Matt Pocock", " ", "-">;
// Expected Output:   ^? "Matt-Pocock"
// type DashName = "Matt-Pocock"

// 3️⃣ Thay thế tất cả ký tự (không chỉ cái đầu tiên):
// Dùng đệ quy lại hoi
type StringReplace<S extends string, From extends string, To extends string> = S extends `${infer Head}${From}${infer Tail}` ? StringReplace<`${Head}${To}${Tail}`, From, To> : S;
type Result = StringReplace<"Evondev Frontend Dev", " ", "-">;
// Expected Output:  ^? "Evondev-Frontend-Dev"
// type Result = "Evondev-Frontend-Dev"