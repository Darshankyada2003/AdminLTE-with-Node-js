const express = require('express');
const { validationRegister, validationLogin } = require('../validation/auth-validation');
const { registration } = require('../controller/auth-controller');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('dashboard')
});

router.get("/login", (req, res) => {
    res.render('login')
});

router.get("/registration", (req, res) => {
    res.render('registration')
});

router.post('/login', validationLogin);
router.post('/registration', validationRegister, registration);

module.exports = router;