const asyncFn = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(2);
    }, 3000);
  });
};
async function asfn() {
  const result = await asyncFn();
  console.log(result);
  return result;
}

asfn().then(() => {
  setTimeout(() => {
    console.log("then out");
  }, 2000);
});
