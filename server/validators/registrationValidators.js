const Joi = require('joi');

const { regexp } = require('../const/');

module.exports = {
    authUser: Joi.object().keys({
        email: Joi.string().required().regex(regexp.EMAIL_REGEXP),
    password: Joi.string().required().regex(regexp.PASSWORD_REGEXP),
    })
};
