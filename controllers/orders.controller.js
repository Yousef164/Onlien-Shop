const ordersModel = require('../models/orders.model');

exports.getOrders = (req, res, next) => {
    ordersModel.getItems()
    .then((items) => {
        res.render('orders', {
            items: items,
            address: req.session.address,
            time
        })
    })
    .catch(err => console.log(err));
};