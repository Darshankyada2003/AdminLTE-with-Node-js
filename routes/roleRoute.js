const express = require('express');
const router = express.Router();
const roleController = require('../controller/roleController');
const roleValidation = require('../validation/roleuser-validation');

// GET
router.get('/role', roleController.roleuser);
router.get('/addNewrole', roleController.addNewrole);

// POST
router.post('/addNewrole', roleValidation.roleuserValidation, roleController.addNewrolePage);

// DELETE
router.delete('/role/:id', roleController.deleteRole);

module.exports = router