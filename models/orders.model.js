const mongoose = require('mongoose');

const DB_URL = "mongodb://localhost:27017/carts"

const Schema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    userId: String,
    productId: String,
    status: String,
    address: String,
    timestamp: Number
})

const ordersItem = mongoose.model('orders', Schema);

exports.getItems = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            
        })
    });
}