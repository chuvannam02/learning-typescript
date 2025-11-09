// Exercise
type personInfo = personName | otherDetails;

type personName = "John" | "Jack" | "Justin";

type otherDetails = {
  id: number;
  age: number;
};

type Person = {
  myInfo: personInfo;
  myOtherInfo: personInfo;
};

const applicant: Person = {
  myInfo: "John",
  myOtherInfo: { id: 123, age: 22 },
};

// Error, why ?
applicant.myInfo.toUpperCase();

// Vấn đề trong exercise này 
// Error:
// Property 'toUpperCase' does not exist on type 'personInfo'.
//   Property 'toUpperCase' does not exist on type 'otherDetails'.
// Câu hỏi đặt ra là tại sao propery myInfor không thể dùng phương thức .toUpperCase() của string được