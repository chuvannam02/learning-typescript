# Basic data types

- Để khai báo Type trong Typescript thì chúng ta sử dụng cú pháp dấu 2 chấm (colon) 
-> keywork(let, const, var) variableName: type = value;
-> param: type = value;

```typescript
let score: number = 10;
// Lúc này nếu cố gắng thay đổi giá trị của biến score thành dạng khác (không phải là number) thì sẽ báo lỗi ngay ở giai đoạn compile (Biên dịch)
score = 'chu văn nam';
// Error:
// Type 'string' is not assignable to type 'number'.ts(2322)
// let score: number
```

Hoàn toàn có thể bỏ phần :type để typescript tự infer kiểu dữ liệu tương ứng từ giá trị gán cho biến như sau:
```typescript
const name = "Chu Văn Nam";
// Ở đây giá trị "Chu Văn Nam" là một string được gán cho biến name
// Typescript tự động nhận diện kiểu dữ liệu String rồi áp dụng cho biến name 
// Hoặc có thể viết đầy đủ hơn là:
// const name: string = "Chu Văn Nam";
```

- Type `any` cho phép sử dụng bất kỳ giá trị nào, hạn chế sử dụng type `any` nhất có thể.
- Type `number` dùng cho giá trị là số - > 10, 10.5
- Type `string` dùng cho giá trị là chuỗi - > "Javascript", "Java"
- Type `boolean` dùng cho giá trị true hoặc false

- Nếu sử dụng type `null` hoặc `undefined` thì biến đó chỉ có thể nhận giá trị null hoặc undefined 
không thể thay đổi sang giá trị khác (dù cho sử dụng let)

- Type `unknown` dùng cho những biến (variables) hoặc parameters mà chúng ta CHƯA XÁC ĐỊNH ĐƯỢC type rõ ràng của nó là gì.

- Sử dụng `typeof variableName` để kiểm tra type của một biến.
- Chỉ sử dụng `typeof` trực tiếp vào variable hoặc parameter, chứ không sử dụng vào Type được.
```typescript
type Example = {};
typeof 10; // number
typeof Example; // Error
```

- Type `never` không gán được bất kỳ giá trị nào.
- Dấu `?` nằm sau property nghĩa là optional (Không bắt buộc: có cũng được, không có cũng được).
- Union Type |
<!-- Hoặc type này hoặc type kia -->
```typescript
// Ví dụ:
string | number;
// Có thể sử dụng alias để có thể tái sử dụng lại type string | number;
type NewNumber = string | number;
```

- Intersection Type &
<!-- Và cái này và cái kia (bắt buộc phải có cả 2) -->
```typescript
{
    name: string
} & {
    address: string
}
```
Tuy nhiên không thể nào kết hợp nhiều type khác nhau lại. Ví dụ như kết hợp number và string
Một biến không thể nào vừa là số vừa là chuỗi được, giả dụ như:
```typescript
score: number & string
// Không hợp lệ
```
<!-- Lúc này sẽ báo lỗi ngay lập tức. Vì như lúc bạn đầu tôi đã đề cập thì một biến không thể nào nhận đồng thời 2 giá trị vừa là số vừa là chuỗi được
nên việc khai báo score: number & string là không hợp lên và sẽ gây ra lỗi hiển thị ngay sau khi compile xong code (Không cần build) -->

- {} là 1 type đặc biệt trong Typescript, nó có tất cả các giá trị ngoại trừ `null` và `undefined`.
- Khi làm việc với Object thì nên khai báo các properties cũng như các type của từng property hoặc dùng `Record<string, any>`

<!-- Mục đích: Kết hợp nhiều kiểu dữ liệu khác nhau => tạo ra Type mới đa dạng hơn -->