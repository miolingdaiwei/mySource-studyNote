const person = {
  name: "syh",
};

function per() {
  this.name = "孙耀辉";
}

function callPerson() {
  console.log(this.name);
  //   this.name 在person的上下文找到了name
}

function doIt() {
  callPerson.call(per);
}

doIt();
