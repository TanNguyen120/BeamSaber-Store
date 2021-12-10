const express = require('express');
const passport = require('passport');

// this function(middleware) is for checking if req user is exist or not
exports.isAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log("not an user");
        res.redirect('/');
    }
    else {
        next();
    }
}