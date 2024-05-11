const express = require('express');
const router = express.Router()
const controller = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')

router
    .route('/create')
    .post(protect, controller.create);
    
router
    .route('/list')
    .get(controller.list);

router
    .route('/getProductById')
    .get(controller.getProductById);

router
    .route('/getProductByCategory')
    .get(controller.getProductByCategory);

router
    .route('/getProductByCatAndViews')
    .get(controller.getProductByCatAndViews);

router
    .route('/updateProductById')
    .put(protect,controller.updateProductById);

router
    .route('/deleteProductById')
    .delete(protect, controller.deleteProductById);

module.exports = router