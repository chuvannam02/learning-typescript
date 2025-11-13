// Problem

// currying function
export const makeKeyRemover = () => () => {};

const keyRemover = makeKeyRemover(["a", "b"]);

const newObject = keyRemover({ a: 1, b: 2, c: 3 });
console.log(newObject?.a);
console.log(newObject?.b);
console.log(newObject?.c);
