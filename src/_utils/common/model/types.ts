/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/14/2025
 * @Time: 1:04 AM
 * @File: types.ts
 */
// types.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    stock?: number;
}

export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}
