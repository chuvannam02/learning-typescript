// Solution

export type ObjectType = {
  name: string;
};

const array: ObjectType[] = [
  {
    name: "John",
  },
  {
    name: "Steve",
  },
];

// Vấn đề trong bài toàn này
// Việc khởi tạo accumulator là object rỗng {} 
// Sau đó lại dùng accum[item.name] = item; => Typescript cảnh bảo có thể property name không tồn tại
// Dẫn tới lỗi undefined truy cập key của property không tồn tại trong object

// Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
//   No index signature with a parameter of type 'string' was found on type '{}'.ts(7053)
// ✅ Cách 1 – Ép kiểu cho accumulator (Type-safe nhất)
const obj = array.reduce((accum, item: ObjectType) => {
  accum[item.name] = item;
  return accum;
}, {} as Record<string, ObjectType>);
// 🔹 Giải thích:

// reduce<Record<string, ObjectType>> nói rõ accumulator là object có key string và value là ObjectType

// {} as Record<string, ObjectType> giúp TypeScript hiểu đúng type khởi tạo ban đầu.
console.log(obj);

// ✅ Cách 2 – Dùng generic để tự động suy luận type
// Nếu bạn muốn viết hàm toRecord() tái sử dụng được nhiều nơi:
function toRecord<T extends Record<string, any>, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T> {
    return array.reduce((accumulator, item) => {
        const k = String(item[key]);
        accumulator[k] = item;
        return accumulator;
    }, {} as Record<string, T>);
}

const obj1 = toRecord(array, "name");
console.log(obj1);
/*
{
  John: { name: 'John' },
  Steve: { name: 'Steve' }
}
*/

// ✅ Cách 3 – Dùng Object.fromEntries (cực gọn)
const obj3 = Object.fromEntries(array.map(item => [item.name, item]));
console.log(obj3);

// TypeScript sẽ suy luận type chính xác:
// const obj3: Record<string, ObjectType>