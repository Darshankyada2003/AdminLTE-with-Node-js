const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');
const roleValidation = require('../validation/roleuser-validation');
const authMiddleware = require('../middleware/auth-middleware');
const admin = require('../middleware/role-middleware');

// GET
router.get('/role', admin.isAdmin, authMiddleware.isAuthenticated, roleController.roleuser);
router.get('/addNewrole', admin.isAdmin, authMiddleware.isAuthenticated, roleController.addNewrole);
router.get('/editrole/:id', admin.isAdmin, authMiddleware.isAuthenticated, roleController.editrolePage);

// POST
router.post('/addNewrole', roleValidation.roleuserValidation, roleController.addNewrolePage);
router.post('/editrole/:id', roleValidation.roleuserValidation, roleController.editrole);

// DELETE
router.delete('/role/:id', roleController.deleteRole);

module.exports = router