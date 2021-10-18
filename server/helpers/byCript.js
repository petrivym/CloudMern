const bcrypt = require('bcrypt');
const {ErrorHandler} = require("../error");
const {WRONG_PASSWORD} = require("../error/errorMassages");
const saltRounds = 5;

module.exports = {
    hesherPassword: (password) => {
        return bcrypt.hashSync(password, saltRounds);
    }
}
