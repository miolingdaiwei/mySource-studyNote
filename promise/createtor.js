function a() {
  this.status = "sta";
}

console.log(a);

const fn = new a();
console.log(fn.status);
