// Solution

// currying function
export const makeKeyRemover =
  <K extends string>(keys: K[]) =>
  <O extends Record<string, any>>(obj: O): Omit<O, K> => {
    return obj;
  };

// Hàm thứ nhất tham số truyền vào là mảng string các key cần loại bỏ ra khỏi object
// Giá trị trả về
// 👉 K được infer (suy luận) là "a" | "b"
// vì mảng ["a", "b"] có literal types 'a' và
//  'b'.

// Tiếp tục với hàm thứ 2:
// Tham số đầu vào nhận vào 1 object
// Output: Nhận một type O loại bỏ đi type K

const keyRemover = makeKeyRemover(["a", "b"]);

// Bài toán
//
const newObject = keyRemover({ a: 1, b: 2, c: 3 });
console.log(newObject?.c);
console.log(newObject?.b);

