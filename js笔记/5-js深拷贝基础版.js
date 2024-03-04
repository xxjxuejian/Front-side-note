// 只考虑普通对象和数组以及基本类型,和循环引用

// 判断是不是对象
function isObject(target) {
  const type = typeof target;

  // 如果target不是null并且属于引用类型,说明属于object类型
  if (target !== null && type === "object") {
    return true;
  }

  // 否则就是基本的类型
  return false;
}

function clone(target, map = new WeakMap()) {
  // 不是引用类型，就是基本类型，直接返回
  if (!isObject(target)) {
    return target;
  }

  // 是普通对象或者数组，直接拿到构造函数
  const cloneObj = new target.constructor();

  // 解决循环引用的问题
  if (map.get(target)) {
    return map.get(target);
  } else {
    map.set(target, cloneObj);
  }

  for (const key in target) {
    cloneObj[key] = clone(target[key], map);
  }
  return cloneObj;
}

const target = {
  field1: 1,
  field2: undefined,
  field3: {
    child: "child",
  },
  field4: [2, 4, 8],
};
target.target = target;

const newObj = clone(target);

target.field3.child = "xxj";
target.field4[0] = 10;

console.log(target);
console.log(newObj);
