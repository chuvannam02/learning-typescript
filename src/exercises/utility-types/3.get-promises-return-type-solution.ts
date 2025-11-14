/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/13/2025
 * @Time: 11:47 AM
 * @File: 3.get-promises-return-type-solution.ts
 */

// Solution
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
type FetchingCars = Awaited<ReturnType<typeof fetchingCars>>;

/* Expected
type FetchingCars = {
  id: number;
  name: string;
  price: string;
  color: string;
}*/

export {};

// Tổng quát hoá thành dạng utility type
// Chúng ta có thể viết một type helper tái sử dụng lại được cho bất kỳ hàm sử dụng async xử lý bất đồng bộ:
type UnwrapPromiseReturn<T extends (...args: any[]) => any> =
    Awaited<ReturnType<T>>;

// @ts-ignore
type FetchingCars1 = UnwrapPromiseReturn<typeof fetchingCars>;
// Giờ bạn có thể dùng:

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchingUser = async () => {
    return {id: 99, name: "Nam"};
};

// @ts-ignore
type FetchingUser = UnwrapPromiseReturn<typeof fetchingUser>;
// => { id: number; name: string }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNestedPromise = async () => {
    return Promise.resolve(Promise.resolve(123));
};
type DeepAwaited<T> = T extends Promise<infer U> ? DeepAwaited<U> : T;
// @ts-ignore
type Result = DeepAwaited<ReturnType<typeof getNestedPromise>>; // number

// 🚀 Cực nâng cao — xử lý cả hàm sync & async
// Viết utility có thể nhận bất kỳ hàm nào (sync hoặc async) mà vẫn lấy được type return cuối cùng:

type UnwrapReturn<T extends (...args: any[]) => any> =
    Awaited<ReturnType<T>>;


// Dùng cho cả:
const getName = () => "Hieu";
const getUser = async () => ({id: 1, name: "Nam"});

// @ts-ignore
type Name = UnwrapReturn<typeof getName>; // string
// @ts-ignore
type User = UnwrapReturn<typeof getUser>; // { id: number; name: string }
