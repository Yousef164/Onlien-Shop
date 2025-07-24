const { rejects } = require('assert');
const mongoose = require('mongoose');
const { resolve } = require('path');

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

exports.getItems = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            return ordersItem.find({userId: id}, {}, {sort: {timestamp: 1}})
        })
        .then(items => {
            mongoose.disconnect();
            resolve(items)
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err)
        });
    });
};

exports.editItem = (id, newData) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL)
        .then(() => {
            ordersItem.updateOne({_id: id}, newData)
        })
        .then(()=> {
            mongoose.disconnect();
            resolve();
        })
        .catch(err => {
            mongoose.disconnect();
            reject(err);
        });
    });
}
