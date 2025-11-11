/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 10:57 PM
 * @File: 4.derive-union-from-object-solution.ts
 */

// Solution
// Phân tích bài toán đặt ra cần được giăi quyết
// Tên file: derive-union-from-object

// Bước 1: Lấy type từ object
// Để type không thể thay đổi thì sử dụng as const để cố định (hằng số)
const fruitCount = {
    apple: 1,
    pear: 4,
    banana: 26,
} as const;

// 1) Lấy type của object
type FruitCount = typeof fruitCount;

// 2) Cách tạo union: với mỗi key K tạo ra { [P in K]: number }, rồi lấy union qua [keyof FruitCount]
type SingleFruitCount = {
  [K in keyof FruitCount]: {
      [P in K]: number
    }
}[keyof FruitCount];

// Từ một object (ở đây fruitCount) ta muốn tạo ra một union type mà mỗi nhánh của union là một object chứa đúng một key (một loại trái cây) với giá trị tương ứng (số).
// Nói cách khác: biến singleFruitCount phải cho phép một object chỉ có 1 thuộc tính — hoặc { apple: number } hoặc { pear: number } hoặc { banana: number }.

// type SingleFruitCount =
//   | {
//       apple: number;
//     }
//   | {
//       banana: number;
//     }
//   | {
//       pear: number;
//     };

const singleFruitCount: SingleFruitCount = {
    banana: 12,
};

console.log(singleFruitCount); // ✅ OK
