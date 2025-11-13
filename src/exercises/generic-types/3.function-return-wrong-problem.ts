// Problem

type User = {
  id: number;
  kind: string;
};

// Vấn đề:
// Bài toàn hiện tại đang viết 1 function
// Tham số truyền vào có Type User hoặc type nào đó kế thừa (extends) Type User
// Expected Output: trả về dữ liệu có Type T (Type kế thừa kiểu User)
function makeCustomer<T extends User>(u: T): T {
  // Below error, why?
  return {
    id: u.id,
    kind: "customer",
  };
}