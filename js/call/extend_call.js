function Father() {
  this.name = "papa";
  this.age = 40;
  this.books = ["wanzi", "gongzu"];
}
// 一样的东西

// class Father {
//     constructor() {
//         this.name = "papa";
//         this.age = 40;
//         this.books = ["wanzi", "gongzu"];
//     }
//     teach() {
//         console.log(this.books);
//     }
// }

Father.prototype.teach = function () {
  console.log(this.books);
};

function Son() {
  console.log(this);
  Father.call(this);
  //   son呼叫father来这里将内部的代码到这里执行
  //   所以有了 this.name,this.age,this.bookd
  //   实现了一个继承的功能？？什么lj玩意
  console.log(this);
}

var son = new Son();
console.log(son.books);
// son.teach();
