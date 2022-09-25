const express = require("express");
const os = require("os");
const app = express();

app.get("/index1.js", (req, res) => {
  res.json({
    code: 200,
    message: "这是index1  22",
    list: os.cpus(),
  });
});

app.listen(8000, () => {
  console.log("index1.js========>", "http://localhost:8000/index1.js");
});
