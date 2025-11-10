// Solution

type User = {
  id: number;
  kind: string;
};

// Vấn đề:
// Bài toàn hiện tại đang viết 1 function
// Tham số truyền vào có Type User hoặc type nào đó kế thừa (extends) Type User
// Expected Output: trả về dữ liệu có Type T (Type kế thừa kiểu User)

// C1: Dùng type-assertion as T để typescript hiểu output có type là T (hằng số, không thay đổi được)
function makeCustomerC1<T extends User>(u: T): T {
  // Below error, why?
  return {
    id: u.id,
    kind: "customer",
  } as T;
}

function makeCustomer<T extends User>(u: T): T {
  // Below error, why?
  return {
    ...u,
    id: u.id,
    kind: "customer",
  };
}

// Cách 2: Generic + override kiểu kind (advanced)
function makeCustomerC2<T extends User>(u: T): Omit<T, "kind"> & { kind: "customer" } {
  return {
    ...u,
    kind: "customer",
  };
}
// Omit<T, "kind"> & { kind: "customer" }:

// Giữ tất cả property khác của T

// Chỉ override kind thành "customer"

// Ví dụ:
type Admin = User & { role: string };

const admin: Admin = { id: 1, kind: "admin", role: "super" };
const customer = makeCustomer(admin);

// customer:
// {
//   id: number;
//   role: string;
//   kind: "customer";
// }
// ✅ Safe và TypeScript sẽ infer đúng type.


// Cách 3 – Dùng mapped type (nâng cao hơn, nếu bạn muốn preserve tất cả)
type ReplaceKind<T extends User> = Omit<T, "kind"> & { kind: "customer" };

function makeCustomer3<T extends User>(u: T): ReplaceKind<T> {
  return {
    ...u,
    kind: "customer",
  };
}