const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'OrderItem',
        required:true
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    totalPrice: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('Order', orderSchema)
