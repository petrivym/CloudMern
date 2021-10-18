const jwt = require('jsonwebtoken');
const {
    usesConst: {
        ACCESS
    }
} = require('../const/')
const {TIME_ACTIVE_REFRESH_TOKEN, TIME_ACTIVE_ACCESS_TOKEN} = require("../const/userConst");
const config = require("config");


module.exports = {
    creatTokenPair: async (userData, secretKeyAccess = config.get("secretKeyAccess"), secretKeyRefresh = config.get("secretKeyRefresh"), timeActiveAccessToken = TIME_ACTIVE_ACCESS_TOKEN, timeActiveRefreshToken = TIME_ACTIVE_REFRESH_TOKEN) => {
        const {email, id} = userData

        const accessToken = await jwt.sign(
            {
                id: id,
                email: email
            }, secretKeyAccess, {expiresIn: timeActiveAccessToken});

        const refreshToken = await jwt.sign(
            {
                id: id,
                email: email
            }, secretKeyRefresh, {expiresIn: timeActiveRefreshToken});

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    },
    compareToken: async (token, secretKey) => {
        await jwt.verify(token, secretKey)
    }
}
