// const middleWareError = require('../helpers/customErorr')
// // const user= require('../models/product');
// require('express-async-errors');

// module.exports = async (req, res, next) => {

//     const {params: { id: contactId },user: { id: userId } } = req;
//     const user= await User.findById(req.params.id);
//     if (!user.userId.equals(userId)) 
//     throw middleWareError('not authrized', 403, 'you are not authrized')
//     next();

// }