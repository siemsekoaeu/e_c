const express = require('express');
const router = express.Router()
const controller = require('../controllers/companyInfoController')
const protect = require('../middleware/authMiddleware')

router
    .route('/create')
    .post(protect, controller.create);
router
    .route('/list')
    .get(protect, controller.list);

router
    .route('/getCompanyInfoById')
    .get(protect, controller.getCompanyInfoById);

router
    .route('/updateCompanyInfoById')
    .put(protect, controller.updateCompanyInfoById);

router
    .route('/deleteCompanyInfoById')
    .delete(protect, controller.deleteCompanyInfoById);

module.exports = router