// Solution

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
// Hướng giải quyết: Sử dụng Generic + Conditional Types:
// const sendEvent = <T extends Event["type"]>(
//   eventType: T,
//   payload?: Extract<Event, { type: T }>["payload"]
// ) => {
//   console.log();
// };

type EventArguments<E extends Event> = 
  E extends { payload: infer P } ? [E["type"], P] : [E["type"]];

function sendEvent<T extends Event>(...args: EventArguments<T>) {
  console.log(...args);
}

// Dùng function overload
// function sendEvent(type: "LOG_IN", payload: { userId: string }): void;
// function sendEvent(type: "SIGN_OUT"): void;
// function sendEvent(type: Event["type"], payload?: any) {
//   console.log("send", type, payload);
// }
// Giải thích:

// Extract<Event, { type: T }> lọc ra phần tử trong union có type khớp với T.

// Sau đó lấy type của payload tương ứng

sendEvent("LOG_IN", { userId: "abc" }); // ✅ hợp lệ
sendEvent("SIGN_OUT"); // ✅ hợp lệ

sendEvent("LOG_IN", {}); // ❌ thiếu userId
sendEvent("SIGN_OUT", { userId: "x" }); // ❌ không cho phép có payload
