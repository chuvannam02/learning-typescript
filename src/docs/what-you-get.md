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

- Từ khoá `keyof` chỉ được sử dụng cho Type lấy ra danh sách key của các properties trong object
- Nếu muốn sử dụng cho biến thì biến đó phải có từ khoá `typeof` ở phía trước. Ví dụ như sau:
```Typescript
const complexObj = {
  javascript: {
    label: "Javascript",
  },
  typescript: {
    label: "Typescript",
  },
  reactjs: {
    label: "Reactjs",
  },
} as const;

// 👉 Giải thích:

// as const giúp TypeScript co cụm giá trị về literal type, thay vì "string".

// typeof complexObj lấy kiểu của object.

// keyof lấy ra tất cả key của kiểu đó ⇒ "javascript" | "typescript" | "reactjs".

// Hoặc viết đầy đủ hơn là 
type ComplexObj = typeof complexObj;
type ComplexObjKeys = keyof ComplexObj;

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

- `declare` keyword được dùng để khai báo kiểu hoặc giá trị tồn tại ở nơi khác, nhưng không được định nghĩa trong file hiện tại.
- `declare` chỉ hoạt động ở compile-time. Nó không sinh code thực code thực - chỉ giúp Typescript hiểu type của thứ bạn import hoặc dùng
- => Vì vậy, nó chỉ có thể hạn chế ở mức “type check”
```Typescript
// Cú pháp tổng quát
declare const variableName: Type;
declare let variableName: Type;
declare function functionName(...args): ReturnType;
declare class ClassName { ... }
declare module 'some-library';
declare namespace MyNamespace { ... }
declare global { ... }

// Ví dụ:
// Ví dụ 1: biến toàn cục có sẵn
// Giả sử trong browser có biến window.myAppConfig được inject từ script khác, ta có thể khai báo:
// file: global.d.ts
declare const myAppConfig: {
  apiUrl: string;
  version: string;
};

// Dùng được ở mọi nơi
console.log(myAppConfig.apiUrl);
// ➡️ Không cần import, chỉ cần declare để TypeScript hiểu biến này tồn tại.

// Ví dụ 2: KHai báo hàm toàn cục
// Giả sử trong HTML có script load thư viện bên ngoài:
<script>
  function sayHello(name) {
    console.log("Hello " + name);
  }
</script>
// Trong TypeScript, ta có thể khai báo tạm để gọi được mà không báo lỗi:
// file: global.d.ts
declare function sayHello(name: string): void;

// file: main.ts
sayHello("Nam"); // ✅ Không lỗi

// Ví dụ 3: Dùng với module không có type
// Giả sử bạn dùng thư viện cũ không có định nghĩa type, ví dụ some-old-lib.
// Nếu bạn import nó:
import old from 'some-old-lib';
// → TypeScript sẽ báo lỗi "Cannot find module 'some-old-lib'".

// Ta có thể tạo file:
// file: some-old-lib.d.ts
declare module 'some-old-lib' {
  export function doSomething(x: number): string;
}
// Bây giờ TypeScript hiểu module này có tồn tại và biết kiểu của nó.

// Ví dụ 4: dùng declare module để giới hạn kiểu import được phép (ví dụ .png, .jpg, .svg, .json, v.v...),
// Dùng declare module "*.xxx" để giới hạn loại file có thể import
Ví dụ, bạn chỉ muốn cho phép import .png và .svg mà thôi:

// global.d.ts
declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

// ➡️ Giờ đây:
import icon from "./icon.svg"; // ✅ OK
import photo from "./photo.png"; // ✅ OK
import data from "./data.json";  // ❌ Error – không có module "*.json"

// Nếu cố import file .json mà bạn chưa declare module "*.json", TypeScript sẽ báo lỗi:
Cannot find module './data.json' or its corresponding type declarations.ts(2307)
// 👉 Đây chính là cách giới hạn loại file được phép import trong project TypeScript.

// Hoặc còn cách khác là tạo ra một type mới giới hạn các extension hợp lệ
// 3️⃣ Dùng generic + conditional type để kiểm soát upload type (compile-time)
// Giả sử bạn muốn viết function uploadFile() nhưng chỉ cho phép file có extension cụ thể (.png, .jpg chẳng hạn):
type AllowedExtension = "png" | "jpg" | "jpeg";

type FileName<T extends string> = 
  T extends `${string}.${infer Ext}`
    ? Ext extends AllowedExtension
      ? T
      : never
    : never;

function uploadFile<T extends string>(file: FileName<T>) {
  console.log(`Uploading ${file}`);
}

// ✅ OK
uploadFile("avatar.png");
uploadFile("photo.jpeg");

// ❌ Compile error
uploadFile("document.pdf");
uploadFile("music.mp3");

// 💡 Ở đây TypeScript kiểm tra pattern "${string}.${infer Ext}",
// rồi loại bỏ các đuôi không hợp lệ.
```

- 🧩 Vitest là gì?
- Vitest là một testing framework cho JavaScript/TypeScript, tương tự như Jest, nhưng được thiết kế để nhanh hơn, tối ưu cho Vite, và hỗ trợ ESM (ECMAScript Modules) mặc định.
- Nói ngắn gọn: test giúp bạn viết unit test, integration test, hoặc snapshot test cho code JS/TS, đặc biệt khi dùng Vite, Vue, React, hoặc TS dự án frontend.

```javascript
// 🧪 Vitest dùng để làm gì?

// Unit test — kiểm tra từng hàm, từng module:

import { sum } from "./math";
import { describe, it, expect } from "vitest";

describe("sum function", () => {
  it("should add two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
});


// Integration test — kiểm tra các module tương tác:

import { fetchData } from "./api";

it("should fetch user data", async () => {
  const user = await fetchData("user/1");
  expect(user.name).toBe("Luke Skywalker");
});


// Snapshot test — so sánh output UI / string:

import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

it("matches snapshot", () => {
  const { container } = render(<MyComponent />);
  expect(container).toMatchSnapshot();
});

// 💡 Tip: Vitest rất phổ biến trong dự án Vite + TS vì bạn không cần build trước khi test.
// Bạn chỉ cần npx vitest run là chạy test trực tiếp.
```
<!-- Mục đích: Kết hợp nhiều kiểu dữ liệu khác nhau => tạo ra Type mới đa dạng hơn -->