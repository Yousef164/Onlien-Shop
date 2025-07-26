const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

dotenv.config({path: './config.env'});

const home          = require   ('./routes/home.route');
const cartRouter    = require   ('./routes/cart.route');
const authRouter    = require   ('./routes/auth.route');
const adminRouter   = require  ('./routes/admin.route');
const ordersRouter  = require ('./routes/orders.route');
const productRouter = require('./routes/product.route');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(express.static(path.join(__dirname, 'asset')));
app.use(express.static(path.join(__dirname, 'images')));


const store = new SessionStore({
    uri: 'mongodb://localhost:27017/Online-Shop',
    collection: 'sessions'
});


app.use(session({
    secret: process.env.SESSION_SECRET || "this is secret cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
}))

app.use(flash());
app.use('/', home);
app.use('/', authRouter);
app.use('/cart', cartRouter);
app.use('/admin', adminRouter);
app.use('/orders', ordersRouter);
app.use('/product', productRouter);





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
