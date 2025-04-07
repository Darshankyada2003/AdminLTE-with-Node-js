const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');

router.get('/role', roleController.roleUser)

module.exports = router