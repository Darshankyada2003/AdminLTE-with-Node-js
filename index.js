const express = require('express');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const file_store = require('session-file-store')(session);

const authRouter = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboardRoute');
const changePasswordRouter = require('./routes/changpasswordRoute');
const profileRouter = require('./routes/profileRoute');
const roleRouter = require('./routes/roleRoute');
const usersRouter = require('./routes/usersRoute');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// middleware route access
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

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
app.use('/', authRouter);
app.use('/', dashboardRouter);
app.use('/', changePasswordRouter);
app.use('/', profileRouter);
app.use('/', roleRouter);
app.use('/', usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started http://localhost:${PORT}`);
});
