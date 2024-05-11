const mongoose = require('mongoose');

const companyInfoSchema = new mongoose.Schema({
    conpany_name: {
        type: String
    },
    company_address:{
        type: String
    },
    email_address:{
        type: String
    },
    number_phone: {
        type: String
    },
    location: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('CompanyInfo', companyInfoSchema)
