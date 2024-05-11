const express = require('express');
const router = express.Router()
const controller = require('../controllers/userController');
const protect = require('../middleware/authMiddleware.js')

router
    .route('/register')
    .post(controller.registerUser)

router
    .route('/login')
    .post(controller.login)

router
    .route('/list')
    .get(protect, controller.list)

router
    .route('/getUserById')
    .get(protect, controller.getUserById)

router
    .route('/deleteUser')
    .delete(protect, controller.deleteUser) 
    
router
    .route('/updateUser')
    .put(protect, controller.updateUser)

router
    .route('/profile')
    .get(protect,controller.getUserProfile)
    .put(protect,controller.updateUserProfile)

module.exports = router