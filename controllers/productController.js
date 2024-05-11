const asyncHandler = require("express-async-handler");
const News = require("../models/productModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const imageToBase64 = require("image-to-base64");
const moment = require("moment");
const SuccessResponse = require("../utils/SuccessResponse");
const { response } = require("express");

exports.create = asyncHandler(async (req, res, next) => {
  const { price, percentage, title, content, url, author, category} = req.body;
  let urlImage = "";
  urlImage = await imageToBase64(req.files.urlToImage.path);
  const product = await Product.create({
    price,
    percentage,
    priceAfterDescount: price - price * percentage / 100,
    author,
    title,
    content,
    category,
    url,
    urlToImage: `data:${req.files.urlToImage.type};base64,` + urlImage,
    addedAt: Date.now(),
  });

  if (product) {
    res.send(new SuccessResponse("operation successful", product));
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }

  if (!req.files) {
    res.status(400).send("Select an Image.");
  } else {
  }
});

exports.list = asyncHandler(async (req, res) => {
  const product = await Product.find({});
  res.send(new SuccessResponse("operation successful", product));
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.id)
  if (product) {
      res.send(new SuccessResponse("operation successful",product));
  } else {
      res.status(404)
      throw new Error('product not found')
  }
})

exports.getProductByCategory = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.query.category });

  if (products.length > 0) {
    res.send(new SuccessResponse("Operation successful", products));
  } else {
    res.status(404);
    throw new Error('No products found for the category');
  }
});

exports.getProductByCatAndViews = asyncHandler(async (req, res) => {
  const products = await Product.find({ category: req.query.category,views: req.query.views });
  if (products.length > 0) {
    res.send(new SuccessResponse("Operation successful", products));
  } else {
    res.status(404);
    throw new Error('No products found for the category');
  }
});


exports.updateProductById = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.query.id);
  if (!product) {
      return res.status(401).json({
          success: false,
          description: 'Product not found.'
      })
  }
  let response = await Product.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true
  });
  res.send(new SuccessResponse("operation successful", response));
})


exports.deleteProductById = asyncHandler(async (req, res) => {
  const response = await Product.findByIdAndDelete(req.query.id);
  res.send(new SuccessResponse("operation successful", null));
  if (!response) {
      return res.status(401).json({
          success: false,
          description: 'Product not found.'
      })
  }
})



