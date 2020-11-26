const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const port = 4402;
const userRouter = require("./routes/User");
module.exports = userRouter;
require("express-async-errors");
require("dotenv").config();
var cors = require("cors");
require("./db");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/user", userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  if (statusCode >= 500) {
    return res.status(statusCode).json({
      message: err.message,
      type: "INTERNAL_SERVER_ERROR",
      details: []
    });
  } else {
    res.status(statusCode).json({
      message: err.message,
      type: err.type,
      details: err.details
    });
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
