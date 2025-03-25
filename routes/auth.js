const express = require('express');
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

module.exports = router;