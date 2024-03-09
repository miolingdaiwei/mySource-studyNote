const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("data");
    }, 2000);
  });
};

function a() {
  setTimeout(() => {
    return "data";
  }, 2000);
}

async function fn() {
  const result = await getData();
  console.log(result);
  return result;
}
fn().then((res) => {
  console.log("then sucess is " + res);
});

const timeFn = function () {
  return setTimeout(() => {
    console.log("time");
    return "time";
  }, 2000);
};
console.log(timeFn(), "time");
