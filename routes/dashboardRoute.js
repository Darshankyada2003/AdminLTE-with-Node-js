const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
const authController = require('../controller/dashboard-controller')


router.get("/", authMiddleware.isAuthenticated, authController.dashboard);

module.exports = router;    