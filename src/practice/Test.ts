/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/14/2025
 * @Time: 12:00 AM
 * @File: Test.ts
 */
// https://www.youtube.com/watch?v=BhNSauna0eo
// handle async/ await Promise in Typscript
async function getUser(userId: string) {
    return Promise.resolve({
        name: "Chu Văn Nam"
    });
};

// type User = ReturnType<typeof getUser>;
// Tuy nhiên giá trị trả về lại là :
// type User = Promise<{name: string}>
// Trong khi bản thân chúng ta lại muốn lấy giá trị bên trong Promise
// => Giải pháp là sử dụng Utility Type: Awaited<T>
// @ts-ignore
type User = Awaited<ReturnType<typeof getUser>>;
// Expected Result is: type User = { name: string};

// Xử lý giá trị null
type A = string | null | undefined;
// @ts-ignore
type T = NonNullable<A>;
// Expected Result is: type T = string;

// NonNullable<T> khác với Required<T>
type B = {
    name: string | null | undefined;
}
// Ở đây là tránh việc object rỗng {}; => Có ít nhất một key
// Còn các key trong object thì hoàn toàn có thể null hoặc undefined bình thường
// @ts-ignore
type RequiredB = Required<B>;

// Làm việc với type trong Class
// @ts-ignore
class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// Giả sử như bây giờ muốn lấy danh sách tham số bên trong constructor của class thì sao?
// Không thể sử dụng Parameters/ ReturnType (nó chỉ áp dụng cho function)
// @ts-ignore
type M = ConstructorParameters<typeof User>;
// Expected Result: type M = [name: string];

// Thực sự quá dài dòng
// Liệu có cách nào ngắn gọn hơn không?
class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public stock: number
    ) {}
}
type ProductOptional = Partial<InstanceType<typeof Product>>;

class BaseModel<T> {
    constructor(data?: Partial<T>) {
        Object.assign(this, data);
    }
}

class Product1 extends BaseModel<Product> {
    id!: number;
    name!: string;
    price!: number;
    stock!: number;
}

class User1 extends BaseModel<User> {
    id!: number;
    username!: string;
    email!: string;
}
