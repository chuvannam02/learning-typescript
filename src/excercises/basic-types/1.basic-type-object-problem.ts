// Exercise
export type User = unknown;

export const users: unknown[] = [
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

export function logPerson(user: unknown) {
  console.log(` - ${user.name}, ${user.age}`);
}

// Vấn đề trong exercise này
// trong function logPerson thì object user do đang có kiểu dữ liệu unknown
// => Error: 'user' is of type 'unknown'.ts(18046)
// object đang có type là unknown nên không . được 2 properties là name và age
// => Mục tiêu là xử lý lỗi với object user trong compile time
