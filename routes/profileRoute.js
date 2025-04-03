const express = require('express');
const router = express.Router();
const profileController = require('../controller/profile-controller');
const authMiddleware = require('../middleware/auth-middleware');
const userImage = require('../helper/userProfileimg');


// GET
router.get('/profile', authMiddleware.isAuthenticated, profileController.profile);

// POST
router.post('/profile', userImage.uploadImage, profileController.profilePage);

module.exports = router;