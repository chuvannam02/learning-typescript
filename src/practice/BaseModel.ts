/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/14/2025
 * @Time: 12:29 AM
 * @File: BaseModel.ts
 */

export abstract class BaseModel<T> {
    constructor(init?: Partial<T>) {
        if (init) {
            Object.assign(this, init);
        }
    }

    /**
     * Tạo instance mới từ object (thường dùng khi parse dữ liệu API)
     */
    static fromApi<U>(this: new (...args: any[]) => U, data: Partial<U>): U {
        return new this(data);
    }

    /**
     * Chuyển instance hiện tại về object đơn giản (dùng để gửi lên API)
     */
    toApi(): Partial<T> {
        return { ...this };
    }

    /**
     * Clone đối tượng hiện tại (deep clone nếu cần)
     */
    clone(): T {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    /**
     * Merge dữ liệu mới vào instance hiện tại
     */
    merge(data: Partial<T>): this {
        Object.assign(this, data);
        return this;
    }
}

