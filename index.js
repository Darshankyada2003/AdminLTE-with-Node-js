const express = require('express');
require('dotenv').config();
const path = require('path');
const session = require('express-session');
const file_store = require('session-file-store')(session);

const authRouter = require('./routes/authRoute');
const dashboardRouter = require('./routes/dashboardRoute')

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server Started http://localhost:${PORT}`);
});
