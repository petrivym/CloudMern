const router = require('express').Router();

const {authMiddleware} = require("../middleware");
const {registrationControllers} = require('../controllers');


router.post('/registration', authMiddleware.verifyRegistration, registrationControllers.registration);
router.post('/login', authMiddleware.verifyLogin, registrationControllers.login);
router.get('/', authMiddleware.checkLoginUser, registrationControllers.auth);

module.exports = router;
