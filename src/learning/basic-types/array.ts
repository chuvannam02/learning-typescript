const hobbies: string[] = [
  "badminton",
  "table tennis",
  "football",
  "basketball",
  "volleyball",
];
const scores: number[] = [12, 99, 32];
const filter: boolean[] = [false, true];
const student: {
  name?: string;
  age?: number;
  score?: number;
}[] = [
  {
    name: "Chu Văn Nam",
    age: 21,
  },
  {
    name: "Trần Trung Hiếu",
    age: 22
  }
];

// Tuy nhiên lỡ như trường score vừa trả về dạng "10", hoặc 10 thì phải làm sao?
// => Sử dụng Union
