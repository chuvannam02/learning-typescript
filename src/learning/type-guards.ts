// typeof
console.log(typeof 5);
function checkTypeof(value: any) {
    if (typeof value === "number") {
        return 100 + value;
    }

    return null;
}
console.log(checkTypeof(20));
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
    // console.log(infor.x);

    // Dùng in để kiểm tra nếu như 1 property tồn tại trong 1 object
    if ("x" in infor) {
        // Optional Chaining
        console.log(infor?.x);
    } 

    if ("y" in infor) {
        console.log(infor.y);
    }
}