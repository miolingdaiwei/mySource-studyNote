var pro = myPro((resolve, reject) => {
  resolve("sucess");
});

pro.then((res) => {
  console.log(res);
});
