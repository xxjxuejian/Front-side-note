function getType(obj) {
  // 先使用typeof
  let type = typeof obj;
  // 不是对象类型，就是基本的类型，直接返回
  if (type !== "object") {
    return type;
  }

  // 对于typeof返回的结果时object的，在使用toString()方法
  return Object.prototype.toString
    .call(obj)
    .replace(/^\[object (\S+)\]$/, "$1");
}
