setTimeout(() => {
  console.log("timeout");
});
queueMicrotask(test);
function test() {
  console.log("queueMicrotask1");
}

new Promise((res: Function, rej) => {
  res();
}).then(() => {
  console.log("promise");
});
function test2() {
  console.log("queueMicrotask2");
}
queueMicrotask(test2);
console.log("start");

