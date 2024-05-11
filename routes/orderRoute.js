const express = require('express');
const router = express.Router()
const controller = require('../controllers/orderController')
const protect = require('../middleware/authMiddleware')

router
    .route('/create')
    .post(protect, controller.create);

router
    .route('/list')
    .get(protect, controller.list);

router
    .route('/getOrderById')
    .get(protect, controller.getOrderById);

router
    .route('/getOrderByDay')
    .get(protect, controller.getOrderByDay);

// router
//     .route('/getOrderByMonth')
//     .get(protect, controller.getOrderByMonth);

// router
//     .route('/getOrderByYear')
//     .get(protect, controller.getOrderByYear);


// router
//     .route('/updateOrderById')
//     .put(protect, controller.updateOrderById);

// router
//     .route('/deleteOrderById')
//     .put(protect, controller.deleteOrderById);


module.exports = router