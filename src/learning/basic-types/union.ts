{
  // Giả sử mảng chứa rất nhiều loại type khác nhau thì phải làm như thế nào
  const hobbies: (string | number | boolean)[] = [
    "badminton",
    "table tennis",
    "football",
    "basketball",
    "volleyball",
    100,
    false
  ];
  // => Phải sử dụng Union Type
  const scores: number[] = [12, 99, 32];
  const filter: boolean[] = [false, true];
  const student: {
    name?: string;
    age?: number | string;
    score?: number | string;
  }[] = [
    {
      name: "Chu Văn Nam",
      age: 21,
    },
    {
      name: "Trần Trung Hiếu",
      age: "21",
    },
  ];
}
