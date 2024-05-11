const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router()
const controller = require('../controllers/categoryController')

router
    .route('/create')
    .post(protect, controller.createCategory);

router
    .route('/list')
    .get(protect, controller.list);

router
    .route('/deleteCategory')
    .delete(protect, controller.deleteCategory);

router
    .route('/editCategory')
    .put(protect, controller.editCategory);

router
    .route('/post/image/fb')
    .post(protect, controller.imageUpload)


module.exports = router
