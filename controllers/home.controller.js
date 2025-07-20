const productsModel = require('../models/products.model');

exports.getHome = (req, res) =>{
    productsModel.getAllProducts().then(products =>{
        res.render('index', {
            title: 'Home Page',
            products: products,
            isUser: req.session.userId,
            validationErrors: req.flash('validationErrors')
        });
    })
}