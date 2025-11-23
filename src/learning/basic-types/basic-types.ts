/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable prefer-const */
 
const language: string = 'javascript';
// Không thể thay đổi giá trị của biến language sang kiểu dữ liệu khác kiểu string
// language = 100;
// Khi khai báo kiểu dữ liệu cho biến thì trong lúc code compliler sẽ tự động intellisen (gợi ý các phương thức tương ứng của kiểu dữ liệu đó)
// Ví dụ như đối với kiểu dữ liệu string

const positiveNumber: number = 1;
// positiveNumber.split("");

const isAvailable: boolean = false;
// Ternary Operator
const text: string = isAvailable ? "Còn hàng" : "Đã hết hàng";

// Nếu không khai báo kiểu dữ liệu, cũng không gán giá trị gì cho biến ví dụ là keyboard 
// thì mặc định typescript sẽ tự động gán kiểu dữ liệu any (tức là nhận bất kỳ giá trị thuộc bất kỳ kiểu dữ liệu nào cũng được)
let keyboard;
let keyboard1: any;
keyboard1 = "Chu Văn Nam";
keyboard1 = 1;
keyboard1 = false;
// => Hạn chế sử dụng any nhất có thể trong dự án thực tế


let testUndefined: undefined = undefined;
// testUndefined = 21;
const test: null = null;

let study: unknown;
// study = "reactjs";
// study.split()

if (typeof study === 'string') {
    // Dùng typeof đối với unknown thì mới tự động suggest ra phương thức split() của string
    // Còn nếu khai báo là unknown thì mặc dù gán giá trị cho biến là kiểu string nhưng sẽ không tự động gợi ý các phương thức liên quan của string.
    study.split("");
}

// Giả sử viết một function tính tổng như sau:
function sum(a, b) {
    return a + b;
}
// Bình thường là sẽ truyền vào giá trị là số nguyên chẳng hạn
// Tuy nhiên nếu người dùng lại truyền dạng string như này thì sao?
// = > Lúc này cần khai báo type cho các tham số truyền vào trong function

function sumUseType(a: number, b: number) {
    return a + b;
}
// Lúc này khi sử dụng sai tham số truyền vào sẽ báo lỗi ngay tránh build code hoặc chạy code mới hiển thị lỗi, compile xong là báo lỗi ngay để kịp thời khắc phục.
// Error:
// Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)

// -- Nếu khai báo kiểu dữ liệu của tham số truyền vào là unknown thì sao?
// function sumUseUnknownVariable(a: unknown, b: unknown) {
//     return a + b;
// }
// Vì a, b đều là unknown nên => a + b typescript đang không hiểu là gì
// Error:
// 'a' is of type 'unknown'.ts(18046)
// (parameter) a: unknown

// => Cần sử dụng typeof để kiểm tra type của tham số đầu vào nếu là kiểu number thì mới return a + b được
function sumUseUnknownVariableV2(a: unknown, b: unknown): number {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } 

    return 0;
}

function calculate(): never {
    while(true) {
    }
}
