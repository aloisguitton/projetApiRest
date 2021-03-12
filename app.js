const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const multer = require('multer');
const upload = multer();

const app = express();

const userRouter = require('./routes/userRouter');
const covidRouter = require('./routes/covidRouter');
const newsRouter = require('./routes/newsRouter');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(upload.single('file'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/user', userRouter);
app.use('/covid', covidRouter);
app.use('news',newsRouter);

app.use(function(req, res, next) {
    next(createError(404));
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = process.env.ENV === 'dev' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

