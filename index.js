const express = require('express');
require('dotenv').config();
const path = require('path');
const router = require('./routes/authRoute');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


//Route
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started http://localhost:${PORT}`);
});
