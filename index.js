const express = require('express');
require('dotenv').config();
const path = require('path');
const router = require('./routes/authRoute');
const session = require('express-session');
const file_store = require('session-file-store')(session);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const File_session = {};

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new file_store(File_session)
}));

//Route
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started http://localhost:${PORT}`);
});
