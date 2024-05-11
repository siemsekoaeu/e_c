const asyncHandler = require("express-async-handler");
const Order = require('../models/orderModel');
const OrderItem = require('../models/oderItemModel');
const moment = require("moment");

const SuccessResponse = require("../utils/SuccessResponse");
exports.create = async (req, res) => {
    try {
        const orderItemsIds = await Promise.all(req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            });
            newOrderItem = await newOrderItem.save();
            return newOrderItem._id;
        }));
        const totalPrices = await Promise.all(orderItemsIds.map(async (orderItemId) => {
            const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice;
        }));
        const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
        let order = new Order({
            orderItems: orderItemsIds,
            // shippingAddress1: req.body.shippingAddress1,
            // shippingAddress2: req.body.shippingAddress2,
            // city: req.body.city,
            // zip: req.body.zip,
            // country: req.body.country,
            // phone: req.body.phone,
            // status: req.body.status,
            totalPrice: totalPrice, 
            user: req.body.user
        });
        order = await order.save();
        if (!order)
            return res.status(400).send('The order cannot be created!');
        res.send(new SuccessResponse("operation successful", order));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.list = asyncHandler(async (req, res) => {
    const order = await Order.find({});
    res.send(new SuccessResponse("operation successful", order));
});

exports.getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.query.id)
    if (order) {
        res.send(new SuccessResponse("operation successful",order));
    } else {
        res.status(404)
        throw new Error('order not found')
    }
  })

  
exports.getOrderByDay = asyncHandler(async (req, res) => {
    const order = await Order.find({ createdAt: req.query.createdAt });
  
    if (order.length > 0) {
      res.send(new SuccessResponse("Operation successful", order));
    } else {
      res.status(404);
      throw new Error('No order found');
    }
  });

  