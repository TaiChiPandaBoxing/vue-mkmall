const express = require('express');
const path = require('path');
const ejs = require('ejs');
/* eslint-disable no-unused-vars */
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

// mongoose.connect('mongodb://127.0.0.1:27017/dumall')
mongoose.connect('mongodb://Deadlinex:zt03020356@ds241677.mlab.com:41677/dumall')
// mongoose.connection.on('connected', () => {
//   console.log('MongoDB connected success.')
// })
// mongoose.connection.on('error', () => {
//   console.log('MongoDB connected fail.')
// })
// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB connected disconnected.')
// })
const index = require('./routes/index');
const users = require('./routes/users');
const goods = require('./routes/goods');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

/* eslint-disable no-underscore-dangle */
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 进行路由拦截
app.use((req, res, next) => {
  if (req.cookies.userId) {
    next()
    return
  }
  // req.originalUrl.indexOf('/goods/list') > -1
  if (req.originalUrl === '/users/login' || req.originalUrl === '/users/logout' || req.path === '/goods/list') {
    next()
    return
  }
  res.json({
    status: '0',
    msg: '当前未登录',
    result: ''
  })
})

app.use('/', index);
app.use('/users', users);
app.use('/goods', goods);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
