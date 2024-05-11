const mongoose = require('mongoose');

const orderIteSchema = new mongoose.Schema({
   quantity:{
    type:Number,
    required:true
   },
   product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
   },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('OrderItem', orderIteSchema)
