const ordersModel = require('../models/orders.model');
const cartModel = require('../models/cart.model');
const validationResult = require('express-validator').validationResult;

exports.getOrders = (req, res, next) => {
  cartModel.getItemByUser(req.session.userId)
    .then((items) => {
      const endDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      const now = new Date().getTime();
      const distance = endDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      res.render('orders', { 
        title: "Orders Page",
        isUser: true,
        items: items, 
        isAdmin: req.session.isAdmin,
        ordersError: req.flash('ordersError'),
        time: {
          days: days,
          hours: hours,
          minutes: minutes,
          seconds: seconds
        }
      });
      console.log(items)
    })
    .catch(err => console.log(err));
};

exports.postOrders = (req, res, next) => {
  if(validationResult(req).isEmpty) {
    ordersModel.editItem(req.body.productId, {amount: req.body.amount})
    .then(() => res.redirect('/orders'))
    .catch(err => console.log(err));
  }
  else {
    req.flash('ordersError', validationResult(req).array());
    req.redirect('/orders')
  }
}
