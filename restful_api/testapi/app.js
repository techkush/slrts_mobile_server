const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
//routes path
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const LocationRoutes = require('./api/routes/locations');

//get feedback from client
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Routes which should handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/location', LocationRoutes);

//error handling part 1
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;

//------------------------
// app.use((req, res, next) => {
//     res.status(200).json({
//         message: 'It works!'
//     })
// });