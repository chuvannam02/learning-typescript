{
  const directions = {
    left: "left",
    right: "right",
    bottom: "bottom",
    top: "top",
  } as const;

  const left = directions.left;
  // => Có thể sử dụng Enums thay vì phải tạo 1 variable object as const (để không thay đổi được giá trị)

  enum Direction {
    top,
    right,
    bottom,
    left
  }
  // tự động đánh số thứ tự => top là 0, right là 1, bottom là 2, left là 3
  // Nhưng hoàn toàn có thể chỉ định số thứ tự
  // Numeric Enums
  enum DirectionV1 {
    top = 1,
    right = 3,
    bottom = 5,
    left = 7
  }

  // String Enums
  enum Tab {
    POPULAR = "POPULAR",
    RECENT = "RECENT",
    LATEST = "LATEST",
    NEW = "NEW"
  }
  const latest = Tab.LATEST;
  
}
