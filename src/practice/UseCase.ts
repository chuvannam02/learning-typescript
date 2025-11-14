/**
 * @Project: learning-typescript
 * @Author: CHUNAM
 * @Date: 11/14/2025
 * @Time: 12:32 AM
 * @File: UseCase.ts
 */

// 🔹 2. Dùng type, Pick, Partial, Omit để tránh viết lại interface thủ công
// Ví dụ Angular form hoặc React form update product:

    // type ProductUpdate = Partial<Product>;
// => tất cả các field đều optional

// type ProductSummary = Pick<Product, 'id' | 'name'>;
// => chỉ lấy một số field

// type ProductWithoutPrice = Omit<Product, 'price'>;
// => bỏ field 'price'
// 💡 Ứng dụng thực tế: Khi làm PATCH API, hoặc form update, không cần tạo lại interface mới cho từng trường hợp.

// 🔹 3. Dùng ReturnType và Parameters để tự động hóa type từ hàm hoặc service
// Ví dụ trong Angular service:

// @Injectable()
// export class ProductService {
//     getProduct(id: number) {
//         return this.http.get<Product>(`/api/products/${id}`);
//     }
// }

// type ProductResponse = ReturnType<ProductService['getProduct']>;
// → ProductResponse tự động lấy kiểu trả về của getProduct() mà không cần gõ lại.
//     Cực kỳ hữu ích khi API nhiều hoặc thay đổi thường xuyên.

// 🔹 4. Dùng ConstructorParameters để trích xuất tham số class
class User2 {
    constructor(public name: string, public age: number) {
    }
}

type UserArgs = ConstructorParameters<typeof User2>;
// => [name: string, age: number]

// Ứng dụng:
const args: UserArgs = ['John', 25];
const user = new User(...args);
// → Dùng trong Angular để tạo instance động từ metadata hoặc config JSON.

// 🔹 5. Dùng as const + literal types để làm config mạnh mẽ
// React hoặc Angular đều có thể:
const STATUS = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
} as const;

type Status = typeof STATUS[keyof typeof STATUS];
// => "active" | "inactive" | "pending"
// → Dùng để đảm bảo form status, API enum, dropdown value luôn đúng, tránh lỗi “string tự do”.

// 🔹 6. Dùng Record để ánh xạ cấu trúc dữ liệu động
// Ví dụ: mapping React component hoặc Angular component từ key.
const components: Record<string, any> = {
    // button: ButtonComponent,
    // input: InputComponent,
};

// Hoặc chặt chẽ hơn:
type ComponentMap = Record<'button' | 'input', any>;

// 🔹 7. Dùng Generic để tái sử dụng logic API hoặc form
interface ApiResponse<T> {
    data: T;
    success: boolean;
}

function fetchData<T>(url: string): Promise<ApiResponse<T>> {
    return fetch(url).then(res => res.json());
}

// → Ứng dụng trong React Query hoặc Angular service:
// @ts-ignore
fetchData<Product>('/api/products').// 🔹 8. Dùng Utility type + Mapped type cho form dynamic
// Ví dụ Angular Reactive Form:
// in Angular
// type FormGroupFrom<T> = {
//     [K in keyof T]: FormControl<T[K]>;
// };

// type ProductForm = FormGroupFrom<Product>;
// → Tự động sinh form control tương ứng kiểu dữ liệu, không cần viết tay.
