const express = require('express');
const router = express.Router();
const usersController = require('../controller/users-controller');
const validation = require('../validation/addNewUser-validation');
const uploadImage = require('../helper/userProfileimg');
const authMiddleware = require('../middleware/auth-middleware');
const admin = require('../middleware/role-middleware');

// GET
router.get('/users', admin.isAdmin, authMiddleware.isAuthenticated, usersController.usersGet);
router.get('/addUser', admin.isAdmin, authMiddleware.isAuthenticated, usersController.addUserPage);
router.get('/editUser/:id', admin.isAdmin, authMiddleware.isAuthenticated, usersController.addUserPage);


//POST
router.post('/addUser', uploadImage.uploadImage, validation.addNewUserValidation, usersController.addOrEditUser);
router.post('/editUser/:id', uploadImage.uploadImage, validation.addNewUserValidation, usersController.addOrEditUser);

module.exports = router;