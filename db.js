require('dotenv').config();
const mongoose=require('mongoose');
const MONGO_URI=process.env.MONGO_URI;
mongoose
.connect(MONGO_URI)
.then(()=>{
    console.info(`conneccted to mongo db successfully`)
})
.catch((err)=>{
console.log("error to conncet db");
console.error(err);
process.exit(1); // to close process if can't access to db
})