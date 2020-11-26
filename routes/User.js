const User = require("../models/User");
const Contact = require("../models/Contact");
const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication");
const ownerAuthorization = require("../middlewares/ownerAuthorization");
const validationMiddleWare = require("../middlewares/validationMiddleware");
const mongoose = require("mongoose");
require("express-async-errors");
require("dotenv").config();
const router = express.Router();
const { check } = require("express-validator");

//-----------------get User by id ---------------------------//
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  //const users=await User.find();
  const user = await User.findById(id)
    .populate("username")
    .populate("email")
  res.json(user);
  console.log("user is", user);
});
//---------------------------UpdateUser---------------------------//

///-----------------------Register-----------------//
router.post(
  "/register",
  // validationMiddleWare(
    check("password")
      .isLength({
        min: 3
      })
      .withMessage("must be at least 4 chars long"),
    check("email").isEmail()
  // )
  ,
  async (req, res, next) => {
    const {  username,email,password } = req.body;
    const user = new User({
      username,
      email,
      password
    });
    await user.save(function(err) {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          return res
            .status(422)
            .send({ succes: false, message: " email already exist!" });
        }

        return res.status(422).send(err);
      }

      res.json({
        success: true,
        user
      });
    });
  }
);

////------------------------------login-----------------------//
router.post("/login", async (req, res) => {
  console.log("from login");
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("wrong email ");
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error("wrong password");

  const token = await user.generateToken();

  if (!token) throw new Error("token  cant created");

  res.json({ token, user });
});


///---------------------------------Add Contact iformation---------------------///
router.post(
  "/contact",
  authenticationMiddleware,
  async (req, res, next) => {
    const {
      UserId,
      username,
      email,
      password,
      subject,
      message,
    } = req.body;
    const newContact = new Contact({
      UserId,
      username,
      email,
      password,
      subject,
      message,
    });
    await newContact.save();
    res.json({
      newContact
    });
  }
);

module.exports = router;

///---------------------------------------------------------------------/////
