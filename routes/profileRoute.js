const express = require('express');
const router = express.Router();
const profileController = require('../controller/profile-controller');

//GET
router.get('/profile', profileController.profile);

module.exports = router;