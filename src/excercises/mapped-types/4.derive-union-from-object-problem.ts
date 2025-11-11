// @ts-ignore
/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/11/2025
 * @Time: 10:57 PM
 * @File: 4.derive-union-from-object-problem.ts
 */

// Problem
// Phân tích bài toán đặt ra cần được giăi quyết
// Tên file: derive-union-from-object


// @ts-expect-error
const fruitCount = {
    apple: 1,
    pear: 4,
    banana: 26,
};

// Từ một object (ở đây fruitCount) ta muốn tạo ra một union type mà mỗi nhánh của union là một object chứa đúng một key (một loại trái cây) với giá trị tương ứng (số).
// Nói cách khác: biến singleFruitCount phải cho phép một object chỉ có 1 thuộc tính — hoặc { apple: number } hoặc { pear: number } hoặc { banana: number }.

type SingleFruitCount = unknown;
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

// @ts-ignore
const singleFruitCount: SingleFruitCount = {
    banana: 12,
};
