const express = require('express');
const connectDB = require('./config/db.js');
const formData = require('express-form-data');

require('colors');
require('dotenv').config();

const userRoutes         = require('./routes/userRoutes.js');
const productRoutes      = require('./routes/productRoute.js');
const categoryRoutes     = require('./routes/categoryRoute.js');
const orderRoutes        = require('./routes/orderRoute.js');
const versionRoutes      = require('./routes/versionRoute.js');
const companyInfoRoutes  = require('./routes/companyInfoRoute.js');



const morgan = require('morgan');

connectDB();

const app = express();

app.use(formData.parse());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));


app.use('/api/v1/users'       , userRoutes);
app.use('/api/v1/product'     , productRoutes);
app.use('/api/v1/category'    , categoryRoutes);
app.use('/api/v1/order'       , orderRoutes);
app.use('/api/v1/version'     , versionRoutes);
app.use('/api/v1/companyInfo' , companyInfoRoutes);




app.get('*', function (req, res) {
  res.status(404).json({
    msg: "Api path not found."
  });
});

const PORT = process.env.PORT || 7100;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue,
  ),
);
