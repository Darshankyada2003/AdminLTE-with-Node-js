const express = require('express');
const { validationRegister, validationLogin } = require('../validation/auth-validation');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('dashboard')
});

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/registeration", (req, res) => {
    res.render('registeration')
});

router.post('/login', validationLogin);
router.post('/registeration', validationRegister);

module.exports = router;