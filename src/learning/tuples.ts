{
  // Tuple
  // Ví dụ dưới đây: cố định 3 phần tử
  // Vị trí mỗi phần tử tương ứng
  // Phần tử thứ nhất: index = 0, có kiểu dữ liệu number
  // Phần tử thứ hai: index = 1, có kiểu dữ liệu number
  // Phần tử thứ ba: index = 2, có kiểu dữ liệu number
  const scores: [number, number, number] = [100, 200, 300];

  const scores1: [number, string, boolean] = [100, "nam", true];
  // Tuy nhiên chúng ta không biết number, string, boolean là cái gì, mục đích để làm gì
  // => Có thể đặt tên cho chúng được.
  const information: readonly [
    count: number,
    username: string,
    isAdmin: boolean
  ] = [100, "nam", true];

  // Lúc này mảng sẽ không giống ban đầu đã khai báo
  //   information.push(100);
  // => Lúc này cần sử dụng từ khoá readonly (Không sử dụng được as const)

  let changeInformation: readonly [
    count: number,
    username: string,
    isAdmin: boolean
  ] = [100, "nam", true];

  // Thay đổi tuples thì các phần tử trong mảng cũng phải đúng thứ tự, đúng kiểu dữ liệu
  changeInformation = [1, "Duy", false];
}
