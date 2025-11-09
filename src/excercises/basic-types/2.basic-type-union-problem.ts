// Exercise
interface User {
  name: string;
  age: number;
  occupation: string;
}
interface Admin {
  name: string;
  age: number;
  role: string;
}

export type Person = unknown;

export const persons: User[] = [
  {
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  {
    name: "Jane Doe",
    age: 32,
    role: "Administrator",
  },
  {
    name: "Kate Müller",
    age: 23,
    occupation: "Astronaut",
  },
  {
    name: "Bruce Willis",
    age: 64,
    role: "World saver",
  },
];

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}

// Vấn đề trong bài toán/ exercise này
// 1 Person có thể là User hoặc là Admin => trong khi User chứa property occupation, Admin chứa property role
// => Chỉ cần sử dụng Union | cho type Person là được