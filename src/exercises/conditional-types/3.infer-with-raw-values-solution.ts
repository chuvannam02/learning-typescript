// Solution
import type { Equal, Expect } from "@/type-utils";

// Kiểm tra xem dữ liệu trả về trong object chứa property data có trùng khớp với dữ liệu mong đợi hay không?
type GetDataValue<T extends { data: any }> = T["data"];

type tests = [
  Expect<Equal<GetDataValue<{ data: "hello" }>, "hello">>,
  Expect<Equal<GetDataValue<{ data: { name: "hello" } }>, { name: "hello" }>>,
  Expect<
    Equal<
      GetDataValue<{ data: { name: "hello"; age: 20 } }>,
      { name: "hello"; age: 20 }
    >
  >
];