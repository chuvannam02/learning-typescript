# Conditional Type
- `(...args: any) => any`: nghĩa là hàm(function) có thể nhận vào bất kỳ số lượng tham số,
mỗi tham số có kiểu any,
và hàm có thể trả về bất kỳ kiểu dữ liệu nào.
mà chúng ta không biết cụ thể

+ Một hàm nhận bất kỳ số lượng tham số (rest parameters),
+ mỗi tham số có kiểu any,
+ và hàm này trả về giá trị có kiểu any.

- `T extends (...args: infer P) => any? P: never;`: đây là Conditional Type
- Từ khoá `infer`: được sử dụng duy nhất bên trong một Conditional Type (T extends U ? X : Y).
Mục đích: trích xuất (infer) một phần kiểu dữ liệu từ kiểu đang được kiểm tra.
```typescript
// Ví dụ của bạn:
type X = T extends (...args: infer P) => any ? P : never;
// Kiểm tra: T có phải là một hàm (function) không?

// Nếu đúng, infer P yêu cầu TypeScript trích xuất kiểu của các tham số đầu vào của hàm đó và gán kiểu đó cho P.

// Kết quả của Conditional Type sẽ là kiểu của P (một tuple chứa kiểu của các tham số).
```
