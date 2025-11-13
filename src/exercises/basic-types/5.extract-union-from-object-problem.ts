// Exercise
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
};
type ComplexObj = unknown;
// Expected: type ComplexObj = "javascript" | "typescript" | "reactjs"
export {};

// Vấn đề với exercise này
// Tạo Type Từ key của object (hằng số không thay đổi)