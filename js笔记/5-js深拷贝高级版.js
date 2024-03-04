// 1. 可继续遍历的类型
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";

// 2. 不可继续遍历的类型
const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const stringTag = "[object String]";
const numberTag = "[object Number]";
const errorTag = "[object Error]";
const regexpTag = "[object RegExp]";
const symbolTag = "[object Symbol]";

const deepTag = [mapTag, setTag, arrayTag, objectTag];

// 判断是不是对象，高级版本直接使用Object.prototype.toString.call()
function isObject(target) {
  const type = typeof target;

  // 如果target不是null并且属于引用类型,说明属于object类型
  if ((target !== null && type === "object") || type === "function") {
    return true;
  }

  // 否则就是基本的类型
  return false;
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.laseIndex = target.lastIndex;
  return result;
}

function cloneOtherType(target, type) {
  const ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new ctor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    default:
      return null;
  }
}

function clone(target, map = new WeakMap()) {
  // 1. 先获取到类型
  const type = getType(target);
  let cloneObj;

  if (deepTag.includes(type)) {
    cloneObj = new target.constructor();
  } else {
    return cloneOtherType(target, type);
  }

  // 解决循环引用的问题
  if (map.get(target)) {
    return map.get(target);
  } else {
    map.set(target, cloneObj);
  }

  // set类型
  if (type === setTag) {
    for (const item of target) {
      cloneObj.add(clone(item, map));
    }
  }

  // map类型
  if (type === mapTag) {
    for (const [key, value] of target) {
      cloneObj.set(key, clone(value, map));
    }
  }

  // 数组和对象
  for (const key in target) {
    cloneObj[key] = clone(target[key], map);
  }

  return cloneObj;
}
