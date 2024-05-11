const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel.js')
const imageToBase64 = require('image-to-base64');
const SuccessResponse = require('../utils/SuccessResponse.js');

exports.createCategory = asyncHandler(async (req, res) => {
    const { category_name } = req.body
    const category = await Category.findOne({ category_name: category_name });
    if (category) {
        return res.status(401).json({
            success: "false",
            description: 'Category already create.'
        })
    }
    const new_cat = await Category.create({ category_name });
    res.send(new SuccessResponse("operation successful", new_cat));
})

exports.deleteCategory = asyncHandler(async (req, res) => {
    console.log(req.query.catId)
    const category = await Category.findByIdAndDelete(req.query.catId);
    res.send(new SuccessResponse("operation successful", category));
    if (!category) {
        return res.status(401).json({
            success: false,
            description: 'Category not found.'
        })
    }
})

exports.list = asyncHandler(async (req, res) => {
    try {
        const response = await Category.find();
        res.send(new SuccessResponse("operation successful", response));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

exports.editCategory = asyncHandler(async (req, res) => {
    let category = await Category.findById(req.query.catId);
    if (!category) {
        return res.status(401).json({
            success: 'false',
            description: 'Category not found.'
        })
    }
    category = await Category.findByIdAndUpdate(req.query.catId, req.body, {
        new: true,
        runValidators: true
    });
    res.send(new SuccessResponse("operation successful", category));
})

exports.imageUpload = asyncHandler(async (req, res) => {
    console.log(req.files);
    imageToBase64(req.files.images.path)
        .then(
            (response) => {
                console.log(response);
                res.json({
                    path: response
                })
            }
        )
        .catch(
            (error) => {
                console.log(error);
            }
        )
}
)
