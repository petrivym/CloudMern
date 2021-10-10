const bcrypt = require('bcrypt');
const {ErrorHandler} = require("../error");
const {WRONG_PASSWORD} = require("../error/errorMassages");
const saltRounds = 5;

module.exports = {
    hesherPassword: (password) => {
        return bcrypt.hashSync(password, saltRounds);
    },
    checkUser: async (passwordHash, password) => {

        const match = await bcrypt.compare(password, passwordHash);

        if(!match) {
            throw new ErrorHandler(WRONG_PASSWORD.statusCode,WRONG_PASSWORD.message,WRONG_PASSWORD.customCode)
        }
    }
}
