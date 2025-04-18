const express = require('express');
const router = express.Router();
const usersController = require('../controller/users-controller');
const validation = require('../validation/addNewUser-validation');
const uploadImage = require('../helper/userProfileimg');

// GET
router.get('/users', usersController.usersGet);
router.get('/addUser', usersController.addUserPage);
router.get('/editUser/:id', usersController.addUserPage);


//POST
router.post('/addUser', uploadImage.uploadImage, validation.addNewUserValidation, usersController.addOrEditUser);
router.post('/editUser/:id', uploadImage.uploadImage, validation.addNewUserValidation, usersController.addOrEditUser);

module.exports = router;