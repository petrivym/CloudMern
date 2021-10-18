const ErrorHandler = require("../error/error-Handler");
const {ERROR_EMAIL_CONFLICT, WRONG_PASSWORD, NOT_VALID_PASSWORD_OR_EMAIL, NO_TOKEN} = require("../error/errorMassages");
let {User} = require("../models");
const {isValidData} = require("../helpers/validLoginRegistrationValue");
const {checkUser} = require("../helpers/byCript");
const {authUser} = require("../validators/registrationValidators");
const bcrypt = require("bcrypt");
const {compareToken} = require("../helpers/jwtTokens");
const config = require('config');
const jwt = require("jsonwebtoken");


module.exports = {
    verifyRegistration: async (req, res, next) => {
        try {
            const {email} = req.body;

            // const {error} = authUser.validate(req.body);
            //
            // if (error) {
            //     throw new ErrorHandler(NOT_VALID_PASSWORD_OR_EMAIL.statusCode, error.message, NOT_VALID_PASSWORD_OR_EMAIL.customCode)
            // }

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

            // const {error} = authUser.validate(req.body);
            //
            // if (error) {
            //     throw new ErrorHandler(NOT_VALID_PASSWORD_OR_EMAIL.statusCode, error.message, NOT_VALID_PASSWORD_OR_EMAIL.customCode)
            // }

            const user = await User.findOne({email: email});

            if (!user) {
                throw new ErrorHandler(WRONG_PASSWORD.statusCode, WRONG_PASSWORD.message, WRONG_PASSWORD.responseCode)
            }

            const chekPassword = await bcrypt.compare(password, user.password);

            if (!chekPassword) {
                throw new ErrorHandler(WRONG_PASSWORD.statusCode, WRONG_PASSWORD.message, WRONG_PASSWORD.customCode)
            }

            req.user = user
            next();
        } catch (e) {
            next(e);
        }
    },

    checkLoginUser: async (req, res, next) => {
        if (req.method === 'OPTIONS') {
            return next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1];

            if (!token) {
                throw new ErrorHandler(NO_TOKEN.statusCode, NO_TOKEN.message, NO_TOKEN.customCode)
            }
            const isTrueToken = await jwt.verify(token, config.get('secretKeyAccess'))

            req.user = isTrueToken
            next();
        } catch (e) {
            next(e);
        }
    },

}
