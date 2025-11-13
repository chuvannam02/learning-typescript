// Solution
const complexObj = {
  javascript: {
    label: "Javascript",
  },
  typescript: {
    label: "Typescript",
  },
  reactjs: {
    label: "Reactjs",
  },
} as const;

// type ComplexObj = keyof typeof complexObj; // "javascript" | "typescript" | "reactjs"
// 👉 Giải thích:

// as const giúp TypeScript co cụm giá trị về literal type, thay vì "string".

// typeof complexObj lấy kiểu của object.

// keyof lấy ra tất cả key của kiểu đó ⇒ "javascript" | "typescript" | "reactjs".

// Hoặc viết đầy đủ hơn là 
type ComplexObj = typeof complexObj;
type ComplexObjKeys = keyof ComplexObj;
// Expected: type ComplexObj = "javascript" | "typescript" | "reactjs"
// export type { ComplexObj };
export type { ComplexObjKeys };
