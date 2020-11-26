const {check,validationResult} = require('express-validator');
require('express-async-errors');
const CustomError = require('../helpers/customErorr')
module.exports = (...validationChecks) => async (req, re, next) => {

    await Promise.all(
        validationChecks.map(
            check => check.run(req)
        )
    );
    const {
        errors
    } = validationResult(req);
    if (!errors.length) {
        return next();
    }
    throw CustomError('ValidationError', 422, errors)

}