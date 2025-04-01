const express = require('express');
const authvalidation = require('../validation/auth-validation');
const authController = require('../controller/auth-controller');
const authMiddlerware = require('../middleware/auth-middleware');
const router = express.Router();

//GET
router.get("/login", authMiddlerware.Authenticated, authController.loginPage);
router.get("/registration", authMiddlerware.Authenticated, authController.registerPage);
router.get("/forgotpassword", authMiddlerware.Authenticated, authController.forgotPassword);
router.get("/changepassword", authMiddlerware.isAuthenticated, authController.changePassword);
router.get('/logout', authController.logout)

//POST
router.post('/login', authvalidation.validationLogin, authController.login);
router.post('/registration', authvalidation.validationRegister, authController.registration);
router.post('/forgotpassword', authvalidation.validationForgotpassword, authController.forgotPasswordPage);
router.post('/changepassword', authvalidation.validationChangepassword, authController.changePasswordPage);

module.exports = router;