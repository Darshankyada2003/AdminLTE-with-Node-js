const express = require('express');
const authvalidation = require('../validation/auth-validation');
const authController = require('../controller/auth-controller');
const authMiddlerware = require('../middleware/auth-middleware');
const router = express.Router();

router.get("/", authMiddlerware.Authenticated, authController.dashboard);

router.get("/login", authMiddlerware.isAuthenticated, authController.loginPage);

router.get("/registration", authMiddlerware.isAuthenticated, authController.registerPage);

router.post('/login', authvalidation.validationLogin, authController.login);
router.post('/registration', authvalidation.validationRegister, authController.registration);

module.exports = router;