// typeof
function checkTypeof(value: any) {
    if (typeof value === "number") {
        return 100 + value;
    }

    return null;
}
// tsc --noEmit false && node dist/myscript.js
// in
type A = {
    x: number;
};

type B = {
    y: number;
}

// Hoặc cái này hoặc cái kia
type C = A | B;
// Dùng để kiểm tra xem 1 property có tồn tại bên trong 1 object hay không?
function checkInfor(infor: C) {
    // type A chứa property x nhưng do type B không chứa property x nên báo lỗi

    // Dùng in để kiểm tra nếu như 1 property tồn tại trong 1 object
    if ("x" in infor) {
        // Optional Chaining
    } 

    if ("y" in infor) {
    }
}