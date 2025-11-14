/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:47 AM
 * @File: 3.get-promises-return-type-problem.ts
 */

// Problem
    // Phân tích yêu cầu bài toán:
    // file: get-promises-return-type => Xử lý kiểu trả về của Promises
    // Xem xét expected Result: thì return type của Promise là Proise<{...}>
    // Cần xử lý để chúng trả về dữ liệu thoi

// @ts-ignore
const fetchingCars = () => {
        return Promise.resolve({
            id: 1,
            name: "BMW",
            price: "$100000",
            color: "blue",
        });
    };

// @ts-ignore
type FetchingCars = unknown;

/* Expected
type FetchingCars = {
  id: number;
  name: string;
  price: string;
  color: string;
}*/

export {};
