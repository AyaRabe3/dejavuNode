var mongoose = require("mongoose");
const _ =require('lodash');

const ContactSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  username: {
    type: String,
    lowercase: true
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  subject: {
    type:String,
    min: '1990-01-1',
    max: '2020-01-1'
  },
  message: {
    type: String
  },
},
{
  timestamps:true,
  toJSON:{
      virtuals:true,
      transform:(doc)=>{
          return _.pick(doc,["_id",'UserId','username','email','password','subject','message'])
      }
  }

}
);

const Contact = mongoose.model("Contact", ContactSchema);

module.exports = Contact;
