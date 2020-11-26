var mongoose = require("mongoose");
const _ = require("lodash");
// const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");
require("dotenv").config();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true

    },
    password: {
      type: String,
      required: true
    },

    
  },
  {
    collection: "users",
    toJSON: {
      virtuals: true,
      transform: doc => {
        return _.pick(doc, [
          "id",
          "username",
          "password",
          "email",
        ]);
      }
    }
  }
);

//////////////// token////////////////////
const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

userSchema.pre("save", async function() {
  const userInstance = this;
  if (this.isModified("password")) {
    userInstance.password = await bcrypt.hash(
      userInstance.password,
      saltRounds
    );
  }
});
//---------------------to check password of spesifed user-----------------//
userSchema.methods.comparePassword = async function(plainPassword) {
  const userInstance = this;
  return bcrypt.compare(plainPassword, userInstance.password);
};
// ---------------------generate token for this user------------------------------//
userSchema.methods.generateToken = async function(expiresIn = "2w") {
  const userInstance = this;
  return sign({ Id: userInstance.id }, jwtSecret, { expiresIn });
};
// /----------------get user from token----------------------//
userSchema.statics.getUserFromToken = async function(token) {
  const user = this;
  const payload = await verify(token, jwtSecret);
  const currentUser = await user.findById(payload.Id);
  if (!currentUser) throw Error("user");
  return currentUser;
};

const user = mongoose.model("user", userSchema);
module.exports = user;
