{
    // (Type beast Value) - khi khai báo : string => ưu tiên string hơn value của nó hiện tại đang là number
    //   const numericId: string = 123;

    const scores = [1, 2, 3, 4, 5];
    scores.push(6);
    // [1, 2, 3, 4, 5, 6]

    // as const
    // Tuy nhiên bây giờ mình muốn scores lúc này phải là hằng số
    // Không được thêm, xoá, sửa gì trong mảng scores
    // Tức là mãi mãi là [1, 2, 3, 4, 5];
    // => Sử dụng as const => thành readonly (Chỉ đọc)

    // @ts-ignore
    const scores1 = [1, 2, 3, 4, 5] as const; // Cú pháp ngắn gọn hơn
    // @ts-ignore
    const scores2: readonly [1, 2, 3, 4, 5] = [1, 2, 3, 4, 5]; // cú pháp hơi dài
    //   scores1.push(6);
    // Property 'push' does not exist on type 'readonly [1, 2, 3, 4, 5]'.
    //   scores2.push(6);

    //   ====================================================================================
    // as Type
    type User = {
        id: number;
        name: {
            firstName: string;
            lastName: string;
        };
    };

    // @ts-ignore
    const newUser = {} as User;
    // . property của User không hề báo lỗi
    //   const property = newUser?.name?.firstName;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-ignore
    const obj = {};
    //   const age = obj?.age; // undefined
    //   const age1 = object?.age?.abc; // Lỗi vì undefined sử dụng . thì làm gì có gì

    // 100 rõ ràng là number rồi, không ép sang string được
    //   const count = 100 as string;

    // Record<string, any> trả về 1 object
    // string là kiểu dữ liệu của key trong property
    // any là kiểu dữ liệu của value trong property
    const routes: Record<string, any> = {
        "/": "homepage",
        "/about": "About page",
        "/dashboard": "Dashboard page",
    };

    // properties đặc biệt nên không dùng được . notation
    // Phải dùng []
    console.log(routes["/"]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // @ts-expect-error
    const routes1: Record<string, number> = {
        name: 1,
    };

    // ===========================================================================
    // satisfies - Typescript 4.9
    const routes2 = {
        "/": "homepage",
        "/about": "About page",
        "/dashboard": "Dashboard page",
    } satisfies Record<string, any>;
    // Tường minh hơn, tự động intellisen, suggest các key của các properties trong object routes2
    // Tự động báo lỗi nếu key không tồn tại trong object
    // @ts-ignore
    console.log(routes2["evondev"]);

    // Nếu sử dụng
    //   const routes: Record<string, any> = {
    //     "/": "homepage",
    //     "/about": "About page",
    //     "/dashboard": "Dashboard page",
    //   };
    // => Dù có sử dụng key không tồn tại cũng sẽ không báo lỗi
}
