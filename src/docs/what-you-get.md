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
(string | number)[];
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

- Sử dụng `typeof` vào biến để kiểm tra type của một biến nào đó
- Để khai báo type trong typescript thì chúng ta sử dụng từ khoá là:
`interface` và `type`
- Tên Type thì viết theo PascalCase nghĩa là tất cả các chữ cái đầu tiên của từng từ đều in hoa

```typescript
type SOmethingElse = {
    x: number;
};

interface SomethingElse {
    x: number;
}
```

- Khi chúng ta sử dụng dấu : để khai báo type thì cái type nó sẽ mạnh hơn cái value. (Type beast Value)

- `as const` sẽ biến giá trị thành readonly, tức là chỉ đọc chứ không thể thêm, xoá, cập nhật
```typescript
const scores1 = [1, 2, 3, 4, 5] as const; // Cú pháp ngắn gọn hơn
const scores2: readonly [1, 2, 3, 4, 5] = [1, 2, 3, 4, 5]; // cú pháp hơi dài
scores1.push(6);
scores2.push(6);
// Error:
// Property 'push' does not exist on type 'readonly [1, 2, 3, 4, 5]'.
```

- `as Type` nghĩa là chúng ta đang nói dối Typescript rằng, mày tin tao đi, tao biết nó là Type gì mà nên sẽ không báo lỗi nữa.
- Có thể mở rộng Type ra hơn nhưng cũng có thể dễ gây ra lỗi hơn
```typescript
 // as Type
  type User = {
    id: number;
    name: {
      firstName: string;
      lastName: string;
    };
  };

  const newUser = {} as User;
  // . property của User không hề báo lỗi
  //   const property = newUser?.name?.firstName;
```

- `satisfies` thì cái Value sẽ đánh bại cái Type (Value beast Type)
- Khi sử dụng `satisfies` thì giúp code chúng ta rõ ràng hơn, nhưng nó sẽ cố định Type luôn.
```typescript
// satisfies - Typescript 4.9
  const routes2 = {
    "/": "homepage",
    "/about": "About page",
    "/dashboard": "Dashboard page",
  } satisfies Record<string, any>;
  // Tường minh hơn, tự động intellisen, suggest các key của các properties trong object routes2
  // Tự động báo lỗi nếu key không tồn tại trong object
  console.log(routes2["evondev"]);

```
ts-node -esm type-assertions.ts

- Tuples type là mảng được xác định trước độ dài và type cho từng index cụ thể.
- Không sử dụng được `as const` cho Tuples.
- Để Tuples chỉ đọc thì thêm từ khoá `readonly` ở phía trước.

```typescript
const information: readonly [
    count: number,
    username: string,
    isAdmin: boolean
  ] = [100, "nam", true];
  
  // Lúc này mảng sẽ không giống ban đầu đã khai báo
  //   information.push(100); Error cause readonly
  // => Lúc này cần sử dụng từ khoá readonly (Không sử dụng được as const)
```

<!-- Mục đích: Kết hợp nhiều kiểu dữ liệu khác nhau => tạo ra Type mới đa dạng hơn -->