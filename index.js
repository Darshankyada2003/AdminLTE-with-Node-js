const express = require('express');
require('dotenv').config();
const path = require('path');
const { sequelize } = require('./config/sequelize_db')

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started http://localhost:${PORT}`);
});
