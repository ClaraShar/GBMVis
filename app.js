var creatError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var mongoose = require('mongoose')
var routers = require('./routes/index')
var proxy = require('http-proxy-middleware')
var app = express()

var options = {
    target: "http://localhost:3033"
}

//以下一堆不知道干什么的玩意儿
var proxyServer = proxy(options);
app.get('/fie', (req, res) => {
    res.send('hello fie')
});

app.use('/api', proxyServer)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__diename, 'public')));

// routers(app)
// catch 404 and forward to error handler

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;