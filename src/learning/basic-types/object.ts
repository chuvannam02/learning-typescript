// `?` optional (Không bắt buộc)
const student: {
    name?: string,
    age?: number,
    score?: number,
    school?: string
} = {
    name: "Chu Văn Nam",
    age: 21,
    score: 99,
    school: "NEU"
}

// Bình thường nếu không khai báo type Object
// Thì chúng ta phải nhớ từng key của property rồi tự gõ (hoặc Ctrl + C rồi Ctrl + V) một cách thủ công
// Tuy nhiên nếu chúng ta đã khai báo type Object rồi thì khi gán giá trị cho biến => tự động suggest tên của key luôn
const studentV1 = {
    name: "Chu Văn Nam",
    age: 21
};

// Nếu như chúng ta muốn để cố định một giá trị cụ thể thì sao?
// => Khai báo type tương ứng với giá trị chỉ định cụ thể thay vì string, number, boolean, ...
// Ví dụ:
const studentV2: {
    name: "Chu Văn Nam",
    age: number
} = {
    // name: "aabbcc",
    name: "Chu Văn Nam",
    age: 21
}
// Ở đây bắt buộc phải gán giá trị cố định "Chu Văn Nam" cho property name chứ không thể nào nhập bất kỳ giá trị string nào khác.

const studentV3: Record<string, any> = {
    name: "Chu Văn Nam"
};
