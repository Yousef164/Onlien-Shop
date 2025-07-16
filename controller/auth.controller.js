const authModel = require('../models/auth.model');

exports.getSignup = (req, res, next) => {
    res.render('signup', { title: 'Sign Up' });
}

exports.postSignup = (req, res, next) => {
    authModel.createNewUser(req.body.username, req.body.email, req.body.password)
    .then(()=> res.redirect('/login'))
    .catch(err => {
        console.error(err);
        res.redirect('/signup')
    });
}

exports.getLogin = (req, res, next) => {
    res.render('login', { title: 'Login', authError: req.flash('authError') });
}

exports.postLogin = (req, res, next) => {
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

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
}