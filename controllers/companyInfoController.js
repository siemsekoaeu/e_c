const asyncHandler = require('express-async-handler')
const CompanyInfo = require('../models/companyInfoModel.js')
const SuccessResponse = require('../utils/SuccessResponse.js');
const { response } = require('express');

exports.create = asyncHandler(async (req, res) => {
    const { conpany_name, company_address, email_address, number_phone, location } = req.body;
    const companyInfo = await CompanyInfo.findOne({
        conpany_name:conpany_name,
        company_address:company_address,
        email_address:email_address,
        number_phone:number_phone,
        location:location
    });
    if (companyInfo) {
        return res.status(401).json({
            success: false,
            description: 'CompanyInfo already exists.'
        });
    }
    const new_companyInfo = await CompanyInfo.create({
        conpany_name,
        company_address,
        email_address,
        number_phone,
        location
    });
    res.send(new SuccessResponse("operation successful", new_companyInfo));
});

exports.list = asyncHandler(async (req, res) => {
    const response = await CompanyInfo.find();
    res.send(new SuccessResponse("operation successful", response));
})

exports.getCompanyInfoById = asyncHandler(async (req, res) => {
    const response = await CompanyInfo.findById(req.query.id)
    if (response) {
        res.send(new SuccessResponse("operation successful", response));
    } else {
        res.status(404)
        throw new Error('CompanyInfo not found')
    }
})

exports.deleteCompanyInfoById = asyncHandler(async (req, res) => {
    const companyInfo = await CompanyInfo.findByIdAndDelete(req.query.id);
    res.send(new SuccessResponse("operation successful", null));
    if (!companyInfo) {
        return res.status(401).json({
            success: false,
            description: 'CompanyInfo not found.'
        })
    }
})

exports.updateCompanyInfoById = asyncHandler(async (req, res) => {
    let companyInfo = await CompanyInfo.findById(req.query.id);
    if (!companyInfo) {
        return res.status(401).json({
            success: 'false',
            description: 'companyInfo not found.'
        })
    }
    let response = await CompanyInfo.findByIdAndUpdate(req.query.id, req.body, {
        new: true,
        runValidators: true
    });
    res.send(new SuccessResponse("operation successful", response));
})

