const express = require('express');
const router = express.Router();
const usersController = require('../controller/users-controller');

// GET
router.get('/users', usersController.usersGet);


module.exports = router;