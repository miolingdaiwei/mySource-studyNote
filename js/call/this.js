function t1() {
  console.log(this);
}
t1();
const t2 = () => {
  var name = "n";
  console.log(this);
};
t2();
