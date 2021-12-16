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
const auth = require("./components/auth/ath_checking");
const countItems = require("./components/shopping_cart/cartController")


// all specific project router go here
/////////////////////////////////////////////////////////////////////////////////////
// define login router in component folder
const loginRouter = require("./components/auth/login_router");

// define register router
const registerRouter = require("./components/auth/register_router");

// define user router
const usersInforRouter = require("./routes/usersInfo");


// define product router in component folder
const productRouter = require("./components/product");

// define contact router
const contactRouter = require("./components/contact");

// define 404page router
const errorRouter = require("./components/404page");

// define order details router
const orderDetailsRouter = require("./components/order_details");

// define shopping cart router
const shopingCartRouter = require("./components/shopping_cart");

// define about us page router
const aboutUsRouter = require("./components/shop_owner_details");

// define search bar router
const searchBarRouter = require("./components/search_bar");

// define main page router
const indexPageRouter = require("./components/index_page");


//define user profile router
const userRouter = require("./components/user");

//define session handler router
const sessionHandler = require("./components/session_handler");




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
    cookie: { maxAge: 60 * 60 * 24 * 60 }
}));
app.use(passport.initialize());
app.use(passport.session());


/////////////////////////////////////////////////////////////////////////////////////

// use this middle ware to store user session to local var so we can pass it every time another router is use
app.use(function (req, res, next) {
    res.locals.user = req.user;
    //res.locals.authenticated = !req.user.anonymous;
    next();
});


// use this middle ware to set an id for unknown user
app.use(sessionHandler);
app.use((req, res, next) => {
    console.log(req.method + req.path + " unAuthnID: " + req.session.unAuthUser);
    next();
})

// use this to add number of items in cart to views
app.use(countItems.countCartItems);

// ROUTER MUST BE USE AFTER ALL OTHER MIDDLE WARE ARE DEFINED
// default routes
app.use("/", indexPageRouter);
app.use("/users", usersRouter);

// all project middle ware router are put in here
////////////////////////////////////////////////////////////////////////////////////

// middleware for login task
app.use("/login", loginRouter);

app.use("/register", registerRouter);

// middleware for userInfor task
app.use("/user-info", auth.isAuth, usersInforRouter);

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

// middleware for user profile
app.use("/user", auth.isAuth, userRouter);


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
    process.on('unhandledRejection', error => {
        // Will print "unhandledRejection err is not defined"
        console.log('!!!!!! unhandledRejection: ', error.message);
    });
});


module.exports = app;