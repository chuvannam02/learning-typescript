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

export type Person = User | Admin;

export const persons: Person[] = [
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

export function logPerson(person: Person) {
  let additionalInformation: string;
  if (person.role) {
    additionalInformation = person.role;
  } else {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

// Vấn đề trong exercise này
// DO Type Person vừa có thể là type User hoặc có thể là type Admin
// interface User {
//   name: string;
//   age: number;
//   occupation: string; // khác với property role của type Admin
// }

// interface Admin {
//   name: string;
//   age: number;
//   role: string; // Khác với property occupation của Type User
// }

// => Từ đây dẫn tới việc khi sử dụng object.role hoặc object.occupation gặp lỗi
// Error: Property 'role' does not exist on type 'Person'.
//   Property 'role' does not exist on type 'User'.
// Vì lỡ object có Type là Admin thì lại .occupation trong khi property này không tồn tại trong type Admin và tương tự đối với Type User