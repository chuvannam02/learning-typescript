{
    // (Type beast Value) - khi khai báo : string => ưu tiên string hơn value của nó hiện tại đang là number
    //   const numericId: string = 123;
    var scores = [1, 2, 3, 4, 5];
    scores.push(6);
    // [1, 2, 3, 4, 5, 6]
    // as const
    // Tuy nhiên bây giờ mình muốn scores lúc này phải là hằng số
    // Không được thêm, xoá, sửa gì trong mảng scores
    // Tức là mãi mãi là [1, 2, 3, 4, 5];
    // => Sử dụng as const => thành readonly (Chỉ đọc)
    var scores1 = [1, 2, 3, 4, 5]; // Cú pháp ngắn gọn hơn
    var scores2 = [1, 2, 3, 4, 5]; // cú pháp hơi dài
    var newUser = {};
    // . property của User không hề báo lỗi
    //   const property = newUser?.name?.firstName;
    var obj = {};
    //   const age = obj?.age; // undefined
    //   const age1 = object?.age?.abc; // Lỗi vì undefined sử dụng . thì làm gì có gì
    // 100 rõ ràng là number rồi, không ép sang string được
    //   const count = 100 as string;
    // Record<string, any> trả về 1 object
    // string là kiểu dữ liệu của key trong property
    // any là kiểu dữ liệu của value trong property
    var routes = {
        "/": "homepage",
        "/about": "About page",
        "/dashboard": "Dashboard page"
    };
    // properties đặc biệt nên không dùng được . notation
    // Phải dùng []
    var routes1 = {
        name: 1
    };
    // ===========================================================================
    // satisfies - Typescript 4.9
}
