const express = require('express');
const authMiddlerware = require('../middleware/auth-middleware');
const authvalidation = require('../validation/auth-validation');
const changepassword_controller = require('../controller/changepassword-controller');
const router = express.Router();


//GET
router.get("/changepassword", authMiddlerware.isAuthenticated, changepassword_controller.changePassword);


//POST
router.post('/changepassword', authvalidation.validationChangepassword, changepassword_controller.changePasswordPage);

module.exports = router;