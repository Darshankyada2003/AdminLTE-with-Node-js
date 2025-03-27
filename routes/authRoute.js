const express = require('express');
const authvalidation = require('../validation/auth-validation');
const authController = require('../controller/auth-controller');
const authMiddlerware = require('../middleware/auth-middleware');
const router = express.Router();

//GET
router.get("/", authMiddlerware.isAuthenticated, authController.dashboard);
router.get("/login", authMiddlerware.Authenticated, authController.loginPage);
router.get("/registration", authMiddlerware.Authenticated, authController.registerPage);
router.get('/logout', authController.logout)

//POST
router.post('/login', authvalidation.validationLogin, authController.login);
router.post('/registration', authvalidation.validationRegister, authController.registration);

module.exports = router;