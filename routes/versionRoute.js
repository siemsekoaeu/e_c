const express = require('express');
const protect = require('../middleware/authMiddleware');
const router = express.Router()
const controller = require('../controllers/versionController')

router
    .route('/create')
    .post(protect, controller.create);

router
    .route('/list')
    .get(protect, controller.list); 

router
    .route('/getVersionById')
    .get(protect, controller.getVersionById);

router
    .route('/deleteVersion')
    .delete(protect, controller.deleteVersion);

router
    .route('/updateVersion')
    .put(protect, controller.updateVersion);

// router
//     .route('/post/image/fb')
//     .post(protect, controller.imageUpload)


module.exports = router
