const express = require('express');
const authvalidation = require('../validation/auth-validation');
const authController = require('../controller/auth-controller');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('dashboard');
});

router.get("/login", authController.loginPage);

router.get("/registration", authController.registerPage);

router.post('/login', authvalidation.validationLogin, authController.login);
router.post('/registration', authvalidation.validationRegister, authController.registration);

module.exports = router;