// Problem

export const getDeepValue = <Obj, FirstKey, SecondKey>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey
) => {
  return {} as any;
};

const obj = {
  bar: {
    d: 2,
  },
};
// Expected Result: Lấy type của nested key
// Result: number
const result = getDeepValue(obj, "bar", "d");
