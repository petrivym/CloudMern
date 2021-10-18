const {User, OAuthSchema} = require('../models');
const {hesherPassword} = require("../helpers/byCript");
const {OK} = require("../const/responsCode");
const {creatTokenPair} = require("../helpers/jwtTokens");
const {response} = require("express");

module.exports = {
    registration: async (req, res, next) => {
        try {
            const {password} = req.body;
            const hashPassword = await hesherPassword(password);

            const user = await new User({...req.body, password: hashPassword});
            await user.save();

            res.status(OK).json('user was creat');
        } catch (e) {
            next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const {user: {id}, user} = req;

            const tokensPair = await creatTokenPair(user);


            const tokens = await new OAuthSchema({
                ...tokensPair,
                _id: id
            });


            res.status(OK).json({
                    tokensPair,
                    user: {
                        id: user.id,
                        email: user.email,
                        password: user.password,
                        discSpace: user.discSpace,
                        usedSpace: user.usedSpace,
                        avatar: user.avatar
                    }
                }
            )
        } catch (e) {
            next(e);
        }
    },

    auth: async (req, res, next) => {
        try {
            const user = await User.findOne({_id: req.user.id});
            const tokensPair = await creatTokenPair(user);
            res.status(OK).json({
                tokensPair,
                user: {
                    id: user.id,
                    email: user.email,
                    password: user.password,
                    discSpace: user.discSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }
            })
        } catch (e) {
            next(e);
        }
    },
}

