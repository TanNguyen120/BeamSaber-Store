const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const bodyParser = require('body-parser');
const passport = require('./components/auth/passport');
const session = require("express-session");
const flash = require('connect-flash');


// all specific project router go here
/////////////////////////////////////////////////////////////////////////////////////
// define login router in component folder
const loginRouter = require("./components/auth/index");

// define admin router
const adminRouter = require("./components/admin/index");

// define user router
const usersInforRouter = require("./routes/usersInfo");


// define product router in component folder
const productRouter = require("./components/product/index");

// define contact router
const contactRouter = require("./components/contact/index");

// define 404page router
const errorRouter = require("./components/404page/index");

// define order details router
const orderDetailsRouter = require("./components/order_details/index");

// define shoping cart router
const shopingCartRouter = require("./components/shoping_cart");

// define about us page router
const aboutUsRouter = require("./components/shop_owner_details");

// define search bar router
const searchBarRouter = require("./components/search_bar");

// define main page router
const mainPageRouter = require("./components/main_page");



////////////////////////////////////////////////////////////////////////////////////
const app = express();



// ALL MIDDLE WARE FOR THE PROJECT
///////////////////////////////////////////////////////////////////////////////////
// view engine setup

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// use session middle ware with it secret key so we have a secure session id to transfer to client
app.use(session({
    secret: process.env.SESSION_SECRET, resave: true,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

/////////////////////////////////////////////////////////////////////////////////////
// default routes
app.use("/", mainPageRouter);
app.use("/users", usersRouter);

// all project middle ware router are put in here
////////////////////////////////////////////////////////////////////////////////////

// middleware for login task
app.use("/login", loginRouter);

// middleware for adminIndexPage
app.use("/admin", adminRouter);

// middleware for userInfor task
app.use("/user-info", usersInforRouter);

// middleware for productlist task
app.use("/product", productRouter);

// middleware for contact page
app.use("/contact", contactRouter);

// middleware for error page
app.use("/404_not_found", errorRouter);

// middleware for orderdetails
app.use("/check_out", orderDetailsRouter);

// middleware for shopingcart
app.use("/cart", shopingCartRouter);

// middleware for about us page
app.use("/about_us", aboutUsRouter);

// middleware for search bar
app.use("/search", searchBarRouter);


app.get('/flash', function(req, res){
    // Set a flash message by passing the key, followed by the value, to req.flash().
    req.flash('info', 'Flash is back!')
    res.redirect('/');
  });

////////////////////////////////////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});



// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});


module.exports = app;