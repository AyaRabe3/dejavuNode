const userlogin = require("../models/User");
const User = require("../models/User");
const CustomError = require("../helpers/customErorr");
require("express-async-errors");

module.exports = async (req, res, next) => {

const token = req.headers.authorization;
console.log("token",token)
  const userId = req.params.id;
  const userloginid = await userlogin.findById(userId);
  let user;
  if (userloginid == null) {
    user = User;
    console.log(user);
  } else {
    user = userlogin;
    console.log(user);
  }
  if (!token) throw CustomError("Login first", 401, "Login faild ");
  const currentUser = await user.getUserFromToken(token);
  req.user = currentUser;
  next();
};
    // const [, token] = req.headers.authorization.split(" ");
  // console.log(token);