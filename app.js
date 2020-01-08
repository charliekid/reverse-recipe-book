var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const mysql = require('mysql');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var resultsRouter = require('./routes/results');
var authRouter = require('./routes/auth');
var dashboardRouter = require('./routes/dashboard');


var app = express();


// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection({
    host: 'c9cujduvu830eexs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'un1wkfhlzh0kr6r7',
    password: 'rwn4e9l1zhi8x4xb',
    database: 'gmgzigxgy9482pn6',
});


// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// enable session
app.use(session({
    secret: '6wOBwJBStY',
}));


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
var hbs = require('express-handlebars');
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({extname : 'hbs', defaultLayout: 'layout', layoutsDir: __dirname+'/views', partialsDir: [
        //  path to your partials
        path.join(__dirname, 'views/partials'),
    ]}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/results', resultsRouter);
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

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


const port = 3300;
//set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});


module.exports = app;
