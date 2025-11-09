// Exercise
export const programingLanguages = {
  JAVASCRIPT: "javascript",
  REACTJS: "reactjs",
  PHP: "php",
  PYTHON: "python",
  VUE: "vue",
  RUBY: "ruby",
};

export type JavascriptLanguage = (typeof programingLanguages)["JAVASCRIPT"];
// Bây giờ hiện tại type JavascriptLanguage đang là string
// Mong muốn là type JavascriptLanguage sẽ mang giá trị "javascript"
