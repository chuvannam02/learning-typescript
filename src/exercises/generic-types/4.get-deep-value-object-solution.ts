// Solution

export const getDeepValue = <
  Obj extends Record<string, any>,
  FirstKey extends keyof Obj,
  SecondKey extends keyof Obj[FirstKey]
>(
  obj: Obj,
  firstKey: FirstKey,
  secondKey: SecondKey
): Obj[FirstKey][SecondKey] | undefined => {
  return obj[firstKey]?.[secondKey];
};

const obj = {
  bar: {
    d: 2,
  },
};

// Expected Result:
const result = getDeepValue(obj, "bar", "d");
const result2 = getDeepValue(obj, "bar", "e");
