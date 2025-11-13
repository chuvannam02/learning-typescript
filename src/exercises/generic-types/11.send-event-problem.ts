// Problem

// bài luyện TypeScript “type inference và discriminated union” (phân biệt type)
export type Event =
  | {
      type: "LOG_IN";
      payload: {
        userId: string;
      };
    }
  | {
      type: "SIGN_OUT";
    };

// 🚨 Vấn đề hiện tại
// const sendEvent = (eventType: Event["type"], payload?: any) => {};

// ⚠️ Ở đây:

// eventType có thể là "LOG_IN" hoặc "SIGN_OUT".

// Nhưng payload đang là any, nên TypeScript không kiểm tra được gì cả.
// → Bạn có thể truyền payload sai kiểu mà không báo lỗi.

// Ví dụ:

// sendEvent("LOG_IN", { userId: 123 }); // ❌ userId sai kiểu — TS không báo lỗi
// sendEvent("SIGN_OUT", { userId: "abc" }); // ❌ vẫn hợp lệ

// ✅ Mục tiêu bạn phải đạt được
// Bạn cần liên kết eventType với đúng kiểu payload trong union Event,
// bằng cách viết lại sendEvent sao cho TypeScript hiểu mối quan hệ này.
const sendEvent = (eventType: Event["type"], payload?: any) => {};

// Expected Result:
sendEvent("LOG_IN", { userId: "abc" }); // ✅ hợp lệ
sendEvent("SIGN_OUT");                  // ✅ hợp lệ

sendEvent("LOG_IN", {});                // ❌ thiếu userId
sendEvent("SIGN_OUT", { userId: "x" }); // ❌ không cho phép có payload