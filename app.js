const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');


// all specific project router go here
/////////////////////////////////////////////////////////////////////////////////////
// define login router
const loginRouter = require('./routes/login');

// define admin router
const adminRouter = require('./routes/admin');

// define user router
const usersInforRouter = require('./routes/usersInfo');

// define signup router
const signupRouter = require('./routes/signup');

// define product router
const productRouter = require('./components/product/index');



////////////////////////////////////////////////////////////////////////////////////
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// all project middle ware are put in here
////////////////////////////////////////////////////////////////////////////////////
// middleware for login task
app.use('/login', loginRouter);

// middleware for adminIndexPage
app.use('/admin', adminRouter);

// middleware for userInfor task
app.use('/user-info', usersInforRouter);

// middleware for signup page
app.use('/signup', signupRouter);

// middleware for productlist task
app.use('/product', productRouter);

////////////////////////////////////////////////////////////////////////////////////

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



// for secure reason mysql cant connect to mysql version 8 and above so we have to use mysql2 module
const mysql = require('mysql2');

// create connection object which have imformation of our mysql database
const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'beamsaber'
});


// connect our nodejs app to mysql database
conection.connect((err) => {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log("connected to beam saber data base")

})


module.exports = app;