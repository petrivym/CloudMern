const {User, OAuthSchema} = require('../models');
const {hesherPassword} = require("../helpers/byCript");
const {OK} = require("../const/responsCode");
const {creatTokenPair} = require("../helpers/jwtTokens");

module.exports = {
    registration: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashPassword = await hesherPassword(password);

            const user = new User({...req.body, password: hashPassword});
            await user.save();

            res.status(OK).json('user was creat');
        } catch (e) {
            next(e);
        }
    },
    login: async (req, res, next) => {
        try {
            const {user: {id}} = req;


            const tokensPair = await creatTokenPair(req.user);

            const OauthSchema = await new OAuthSchema({
                ...tokensPair,
                _id: id
            })

            res.status(OK).json(OauthSchema);
        } catch (e) {
            next(e);
        }
    },
}
