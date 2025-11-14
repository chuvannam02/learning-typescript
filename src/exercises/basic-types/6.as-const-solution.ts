// Solution
export const programingLanguages = {
  JAVASCRIPT: "javascript",
  REACTJS: "reactjs",
  PHP: "php",
  PYTHON: "python",
  VUE: "vue",
  RUBY: "ruby",
} as const;

// Nếu không sử dụng as const thì hoàn toàn chúng ta có thể sửa được object
// programingLanguages.JAVASCRIPT = "Something else";
// Vì thế nên việc sử dụng (typeof programmingLanguages)["JAVASCRIPT"] sẽ trả về type là string
// do không phải là hẳng số nên trả về string là đúng rồi.
// => Cần không cho phép sửa giá trị trong các properties của object => chỉ đọc
// => Sử dụng as const
export type JavascriptLanguage = (typeof programingLanguages)["JAVASCRIPT"];
