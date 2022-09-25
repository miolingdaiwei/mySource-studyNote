function test() {
  // 这就是?.的实现方法吧？
  //   可以不传参数，但是可以通过arguments获取传入的参数
  console.log(arguments[0] || 0);
}

test(22);
