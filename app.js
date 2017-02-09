var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var MongoStore   = require('connect-mongo')(session);
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');

mongoose.Promise = require('bluebird');

var dbUrl = 'mongodb://localhost/imooc'
var port = normalizePort(process.env.PORT || '3000');
var debug = require('debug')('node_express:server');



var app = express();

mongoose.connect(dbUrl);
mongoose.connection.on('connected', function() 
{
  console.log('Mongoose Connection Success!');
});

// view engine setup
app.set('views', path.join(__dirname, 'app/views/pages')); // 指定视图文件路径
//app.set('views', './views/pages'); // 指定视图文件路径
app.set('view engine', 'jade'); // 设置视图模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  secret : 'imooc',
  store : new MongoStore({ 
    url: dbUrl,
    autoRemove: 'interval',
    autoRemoveInterval: 10 ,// In minutes. Default 
    collection  : 'sessions',

  })
}));

app.use(express.static(path.join(__dirname, 'public')));

app.locals.moment = require('moment');

require('./config/routes')(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) 
{
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') 
{
  app.use(function(err, req, res, next) 
  {
    res.status(err.status || 500);
    res.render('error', 
    {
      message: err.message,
      error: err
    });
  });
  mongoose.set('debug', true)
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) 
{
  res.status(err.status || 500);
  res.render('error', 
  {
    message: err.message,
    error: {}
  });
});



app.set('port', port);
app.listen(port);
// app.on('error', onError);
// app.on('listening', onListening);

console.log('imooc started on port ' + port)



// function 
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}



function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = app.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}