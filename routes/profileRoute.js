const express = require('express');
const router = express.Router();
const profileController = require('../controller/profile-controller');
const authMiddleware = require('../middleware/auth-middleware')

// Image multer
// const multer = require('multer');
// const upload = multer({ dest: "upload/" });

// GET
router.get('/profile', authMiddleware.isAuthenticated, profileController.profile);

// POST
router.post('/profile', profileController.profilePage);

module.exports = router;