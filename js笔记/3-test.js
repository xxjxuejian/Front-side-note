function cloneShallow(target, map = new WeakMap()) {
  // 不是对象，那就是基本类型，直接返回
  if (!isObject(target)) return target;

  // 是对象，但是还要判断是哪一种
  // 如果是null
  if (target === null) return target;

  // 假设这里只有对象和数组类型
  const type = Object.toString.call(target);
  const obj = type === "[object Array]" ? [] : {};
  if (map.get(target)) return map.get(target);
  map.set(target, obj);
  for (const key in target) {
    obj[key] = cloneShallow(target[key]);
  }
  return obj;
}

// 判断类型，typeof null,function Array,Object
function isObject(target) {
  const type = typeof target;

  // 如果target不是null并且属于引用类型,说明属于object类型
  if ((target !== null && type === "object") || type === "function") {
    return true;
  }

  // 否则就是基本的类型
  return false;
}

// let a1 = {
//   name: "xxj",
// };

// const x = [[a1, "a1"]];
// console.log(x);
// a1 = null;
// console.log(x); //产生了内存泄露

function outer() {
  let name = "outer";

  // 内部函数引用了外部函数中的变量
  return function () {
    console.log(name);
  };
}
// 只要innerFn存在，name就会一直保存在内存中
const innerFn = outer();
// 需要手动的
