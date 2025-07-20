const authModel = require('../models/auth.model');
const validationResult = require('express-validator').validationResult


exports.getSignup = (req, res, next) => {
    res.render('signup', {
        title: 'Sign Up',
        authError: req.flash('authError'), 
        validationErrors: req.flash("validationErrors"),
        isUser: req.session.userId 
    });  
}

exports.postSignup = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        authModel.createNewUser(req.body.username, req.body.email, req.body.password)
        .then(()=> res.redirect('/login'))
        .catch(err => {
            req.flash('authError', err);
            res.redirect('/signup')
        });
    }
    else {
        const errors = validationResult(req).array();
        req.flash('validationErrors', errors);
        res.redirect('/signup');
    }
}
exports.getLogin = (req, res, next) => {
    res.render('login', { 
        title: 'Login', 
        authError: req.flash('authError'),
        validationErrors: req.flash('validationErrors'),
        isUser: req.session.userId
    });
}

exports.postLogin = (req, res, next) => {
    if(validationResult(req).isEmpty()){
        authModel.login(req.body.email, req.body.password)
        .then(userId => {
            req.session.userId = userId;
            res.redirect('/');
        })
        .catch(err => {
            req.flash('authError', err);
            res.redirect('/login');
        })
    }
    else{
        const errors = validationResult(req).array();
        req.flash('validationErrors', errors);
        res.redirect('/login');
    }
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}