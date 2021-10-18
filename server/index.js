const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const {RECORD_NOT_FOUND, UNKNOWN_ERROR} = require("./error/errorMassages");
const {authRouter} = require("./routes");
const {corsMiddleware} = require("./middleware")

const app = express();
const PORT = config.get('serverPort');

app.use(corsMiddleware.cors)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/*', _notFoundPage);
app.use(_HandleErrors);


function _HandleErrors(err, req, res, next) {
    res
        .status(err.status || 0)
        .json({
            message: err.message || UNKNOWN_ERROR.massage,
            customCode: err.customCode || UNKNOWN_ERROR.customCode
        });
}

function _notFoundPage(req, res, next) {
    next({
        status: RECORD_NOT_FOUND.statusCode,
        message: RECORD_NOT_FOUND.massage,
        customCode: RECORD_NOT_FOUND.customCode
    })
}

const start = async () => {
    try {
        await mongoose.connect(config.get('dbUrl'));

        app.listen(PORT, () => {
            console.log(`Server run  on Port ${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
