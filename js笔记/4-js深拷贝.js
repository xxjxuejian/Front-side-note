// 判断是不是对象
function isObject(target) {
  const type = typeof target;

  // 如果target不是null并且属于引用类型,说明属于object类型
  if ((target !== null && type === "object") || type === "function") {
    return true;
  }

  // 否则就是基本的类型
  return false;
}

//
function getType(target) {
  return Object.prototype.toString.call(target);
}

function clone(target, map = new WeakMap()) {
  // 不是引用类型，就是基本类型，直接返回
  if (!isObject(target)) {
    return target;
  }

  // 是引用类型，但是需要进一步判断属于哪一种引用类型
  const type = getType(target);
  const cloneObj = new target.constructor();

  if (map.get(target)) {
    return map.get(target);
  } else {
    map.set(target, cloneObj);
  }

  //
  for (const key in target) {
    cloneObj[key] = clone(target[key], map);
  }
}
