const asyncHandler = require('express-async-handler')
const Version = require('../models/versionModel.js')
const SuccessResponse = require('../utils/SuccessResponse.js');
const { response } = require('express');

exports.create = asyncHandler(async (req, res) => {
    const { version } = req.body;
    const vers = await Version.findOne({ version: version });
    if (vers) {
        return res.status(401).json({
            success: false,
            description: 'Version already exists.'
        });
    }
    const new_version = await Version.create({ version });
    if (!new_version) {
        return res.status(500).json({
            success: false,
            description: 'Failed to create version.'
        });
    }
    res.send(new SuccessResponse("operation successful", new_version));
});

exports.list = asyncHandler(async (req, res) => {
    const response = await Version.find();
    res.send(new SuccessResponse("operation successful", response));
})

exports.getVersionById = asyncHandler(async (req, res) => {
    const version = await Version.findById(req.query.id)
    if (version) {
        res.send(new SuccessResponse("operation successful",version));
    } else {
        res.status(404)
        throw new Error('version not found')
    }
})

exports.deleteVersion = asyncHandler(async (req, res) => {
    console.log(req.query.id)
    const response = await Version.findByIdAndDelete(req.query.id);
    res.send(new SuccessResponse("operation successful", null));
    if (!response) {
        return res.status(401).json({
            success: false,
            description: 'Version not found.'
        })
    }
})

exports.updateVersion = asyncHandler(async (req, res) => {
    let version = await Version.findById(req.query.id);
    if (!version) {
        return res.status(401).json({
            success: 'false',
            description: 'Category not found.'
        })
    }
    let response = await Version.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });
    res.send(new SuccessResponse("operation successful", response));
})

