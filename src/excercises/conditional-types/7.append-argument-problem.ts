// Problem

// Bài toán:
// Viết Type cho 1 funtion dạng (a: number, b: string) => number
// Tức là type cho 1 hàm có 2 tham số: a là số, b là chuỗi và giá trị trả về là một số
// Bây giờ mong muốn đặt ra là thêm 1 tham số nữa => hàm này nhận 3 tham số 
type AppendArgument = unknown;

type SomeF = (a: number, b: string) => number;

type FinalF = AppendArgument<SomeF, boolean>;
// FinalF is (x: boolean, a: number, b: string) => number