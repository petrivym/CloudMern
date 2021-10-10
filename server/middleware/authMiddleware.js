const ErrorHandler = require("../error/error-Handler");
const {ERROR_EMAIL_CONFLICT, WRONG_PASSWORD, NOT_VALID_PASSWORD_OR_EMAIL} = require("../error/errorMassages");
let {User} = require("../models");
const {isValidData} = require("../helpers/validLoginRegistrationValue");
const {checkUser} = require("../helpers/byCript");
const {authUser} = require("../validators/registrationValidators");


module.exports = {
    verifyRegistration: async (req, res, next) => {
        try {
            const {email} = req.body;

            const {error} = authUser.validate(req.body);

            if (error) {
                throw new ErrorHandler(NOT_VALID_PASSWORD_OR_EMAIL.statusCode, error.message, NOT_VALID_PASSWORD_OR_EMAIL.customCode)
            }

            const isUnique = await User.findOne({email: email});

            if (isUnique) {
                throw new ErrorHandler(ERROR_EMAIL_CONFLICT.statusCode, ERROR_EMAIL_CONFLICT.massage, ERROR_EMAIL_CONFLICT.customCode)
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    verifyLogin: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            isValidData(req.body);

            const user = await User.findOne({email: email});

            if (!user) {
                throw new ErrorHandler(WRONG_PASSWORD.statusCode, WRONG_PASSWORD.message, WRONG_PASSWORD.responseCode)
            }

            await checkUser(user.password, password);

            req.user = user
            next();
        } catch (e) {
            next(e);
        }
    },

}
