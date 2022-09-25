const express = require("express");
const app = express();

app.get("/cell", (req, res) => {
  res.json({
    code: 200,
    message: "cddddd",
  });
});

app.listen(5000, () => {
  console.log("cell.js===========>", "http://");
});
