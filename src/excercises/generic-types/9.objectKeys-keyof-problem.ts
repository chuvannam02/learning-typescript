// Problem

// Bài toán:
// Duyệt qua tất cả các key trong properties của 1 object
// Expected Result: từ các key đó => Log ra value tương ứng đối với mỗi key trong object
export const myObject = {
  a: 1,
  b: 2,
  c: 3,
};

// Error:
// Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ a: number; b: number; c: number; }'.
//   No index signature with a parameter of type 'string' was found on type '{ a: number; b: number; c: number; }'.ts(7053)
// const myObject: {
    // a: number;
    // b: number;
    // c: number;
// }
Object.keys(myObject).forEach((key) => {
  console.log(myObject[key]);
});