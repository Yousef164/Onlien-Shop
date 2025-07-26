const productsModel = require('../models/products.model');
const validationResult = require('express-validator').validationResult;

exports.getAdd = (req, res, next) => {
    res.render('add-product', {
        title: 'Add Page',
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true
    })
};

exports.postAdd = (req, res, next) => {
    if(validationResult(req).isEmpty()) {
        productsModel.createNewItem({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename
        })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            res.render('error', {
                isUser: req.session.userId,
                isAdmin: req.session.isAdmin
            })
        })
    }
    else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/admin/add');
    }
};