/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
{
    function logLength<T>(item: T): void {
    }
    // => Sẽ báo lỗi ngay lập tức
    // Vì T không được ràng buộc bởi bất kỳ kiểu nào có thuộc tính length
    // Nên TypeScript không thể đảm bảo rằng item sẽ có thuộc tính length
    // Ví dụ: "123".length là hợp lệ
    // Nhưng 123.length thì không hợp lệ
    // Hay một mảng như [1, 2, 3].length là hợp lệ
    // Nhưng một đối tượng như { a: 1, b: 2 }.length thì không hợp lệ

    // Để khắc phục, ta có thể ràng buộc T với một kiểu cụ thể có thuộc tính length
    // => Constraint in Generic
    // => Ràng buộc type T phải mở rộng (extends) một kiểu cụ thể có thuộc tính length
    function logLengthWithConstraint<T extends { length: number }>(
        item: T
    ): void {}
    logLengthWithConstraint("Hello"); // Hợp lệ, vì string có thuộc tính length
    logLengthWithConstraint([1, 2, 3]); // Hợp lệ, vì mảng có thuộc tính length
    // logLengthWithConstraint(123); // Lỗi, vì number không có thuộc tính length

    const student = {
        name: "Alice",
        age: 20,
        school: "University",
    };

    function logObjectValue(obj, key): void {
    }

    // Không có gợi ý về key xem có thuộc obj hay không
    // logObjectValue(student, "grade"); // Hợp lệ, nhưng sẽ lỗi khi chạy vì student không có thuộc tính grade
    logObjectValue(student, "name"); // Hợp lệ, in ra "Alice"

    // Sử dụng ràng buộc để giới hạn key phải là một trong các thuộc tính của obj
    function logObjectValueWithConstraint<
        T extends Record<string, any>,
        K extends keyof T
    >(obj: T, key: K): void {
    }
    logObjectValueWithConstraint(student, "name"); // Hợp lệ, in ra "Alice"

    function getValueObjectByKey<T extends Record<string, any>, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    };

    getValueObjectByKey(student, "age"); // Hợp lệ, trả về kiểu number
    getValueObjectByKey(student, "school"); // Hợp lệ, trả về kiểu string
    getValueObjectByKey(student, "name"); // Hợp lệ, trả về kiểu string
    // getValueObjectByKey(student, "grade"); // Lỗi, vì "grade" không phải là key của student
    // Argument of type '"grade"' is not assignable to parameter of type '"name" | "age" | "school"'.
}
