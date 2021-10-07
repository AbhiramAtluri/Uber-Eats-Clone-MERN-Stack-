var createError = require('http-errors');
var express = require('express');
var path = require('path')
const fileupload = require('express-fileupload')
var bodyparser = require('body-parser')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var session = require('express-session');
var indexRouter = require('./routes/index');
///Router for resteraunt
var RestRouter = require('./routes/RestaurantRoutes');
var custrouter = require('./routes/custroutes')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({extended: true}));
app.use(express.urlencoded({ extended: false }));
app.use(fileupload())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'cmpe273uber',
  resave:false,
  saveUninitialized:false
}))



app.use('/', indexRouter);
app.use('/Restaurant', RestRouter);
app.use('/customer',custrouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




var session = require('express-session');
app.listen(3030,()=>{console.log("listening on 3030")})


// module.exports = app;
