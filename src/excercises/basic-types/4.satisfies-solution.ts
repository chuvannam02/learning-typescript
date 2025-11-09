// Solution
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

const applicant = {
  myInfo: "John",
  myOtherInfo: { id: 123, age: 22 },
} satisfies Person;

console.log(applicant.myInfo.toUpperCase());

// Giải pháp: sử dụng `satisfies` thay vì sử dụng `as const` hay `as Type`
// ⚡ So sánh với as Type
// Cách	                   Hành vi	                                                            Hậu quả
// as const	               Đóng băng toàn bộ literal thành readonly và giữ nguyên literal type	Không lỗi, nhưng sẽ bị ràng buộc rất cứng (vd. không thay đổi được giá trị)
// as Person	           Ép kiểu cứng, bỏ qua kiểm tra thực tế	                            Có thể gây bug vì TS không còn kiểm tra đúng/sai thực tế
// ✅ satisfies Person	 Kiểm tra tương thích mà vẫn giữ type chi tiết thực tế	               Vừa an toàn, vừa thông minh