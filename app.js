require('app-module-path').addPath(__dirname);
require('app-module-path').addPath('./libs/common/');
require('app-module-path').addPath('./models/');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var config = require('config');
var index = require('./routes/index');
var api = require('./routes/api');
var upload = require('./routes/upload');
var user = require('./routes/user');
var product = require('./routes/product');
var topic = require('./routes/topic');
var message = require('./routes/message');
var favorite = require('./routes/favorite');
var comment = require('./routes/comment');
var order = require('./routes/order');
var sysParam = require('./routes/sysParameter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({ dest: 'public/images/uploads/'}));

app.use('/', index);
app.use('/api', api);
app.use('/', upload);
app.use('/user', user);
app.use('/product', product);
app.use('/topic', topic);
app.use('/message', message);
app.use('/favorite', favorite);
app.use('/comment', comment);
app.use('/order', order);
app.use('/sysParameter', sysParam)

//require('dns').lookup(require('os').hostname(), function (err, add, fam) {
//  config.urlPrefix = 'http://' + add + ':8080/';
//})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
