// Solution
// Tạo ra 1 Type cho Object User theo dạng sau thay vì sử dụng unknown
export type User = {
    name: string,
    age: number,
    occupation: string
};

export const users: User[] = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  {
    name: "Kate Müller",
    age: 23,
    occupation: "Astronaut",
  },
];

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}

// => Done: Chỉ cần tạo Type User rồi sửa lại kiểu unknown thành Type User vừa mới định nghĩa là xong.