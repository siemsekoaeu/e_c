const asyncHandler = require('express-async-handler')
const generateToken = require('../utils/generateToken.js')
const User = require('../models/userModel.js')
var crypto = require('crypto');
var mailer = require('../utils/mailer');
const {verifyOtp } = require('../utils/otp.js');
const SuccessResponse = require('../utils/SuccessResponse.js');

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id),
            favorites: user.favorites,
          })
    } else {
        res.status(401).json({
            success: 'false',
            description: 'Unauthorized user'
        })
    }
})

exports.registerUser = asyncHandler(async (req, res, next) => {
    console.log(req.body)

    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
        return res.status(400).json({
            success: "false",
            description: 'Entered email id already registered with us. Login to continue'
        })
    }

    const user = new User({
        name,
        email,
        password,
    })
    user.save(function (err, user) {
        if (err) return next(err);
        res.send(new SuccessResponse("operation successful"));
    });

    // if (user) {
    //   res.status(201).json({
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     token: generateToken(user._id),
    //   })
    // } else {
    //   res.status(400)
    //   throw new Error('Invalid user data')
    // }
})

exports.getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            favorites: user.favorites,
            otp: user.otp
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

exports.list = asyncHandler(async (req, res) => {
    const users = await User.find({})
    res.send(new SuccessResponse("operation successful", users));
})

exports.deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.query.id)
    if (user) {
        await user.remove()
        res.send(new SuccessResponse("operation successful"));
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

exports.getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.query.id)
    if (user) {
        res.send(new SuccessResponse("operation successful",user));
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

exports.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.query.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        const updatedUser = await user.save()
        // res.json({
        //     success: "true",
        //     description: "Oparetion Successfuly",
        //     data: {
        //         _id: updatedUser._id,
        //         name: updatedUser.name,
        //         email: updatedUser.email,
        //     }
        // })
        res.send(new SuccessResponse("operation successful",updatedUser));
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


exports.resetPassword = asyncHandler(async (req, res) => {

    // console.log(verifyOtp(req.body.token));
    console.log(req.body.token)
    res.json({
        token: verifyOtp(req.body.token)
    })
    // const user = await User.findById(req.user._id)
    // const {oldPassword = ''} = req.body;
    // // For old password
    // if (user && (await user.matchPassword(oldPassword))) {
    //   let randomOtp = Math.floor(100000 + Math.random() * 900000);
    //   user.otp = randomOtp;
    //   await user.save();

    //   mailer.send({
    //     to: user.email,
    //     subject: 'Reset your password. ReactNews',
    //     html: `Your otp for reset password is ${randomOtp}`
    //   });

    //   res.status(200).json({
    //     success: true,
    //     msg: 'A Otp has been sent to your registered email address.'
    //   })
    // } else {
    //   res.status(404).json({
    //     success: false,
    //     msg: 'Entered Old Password is Incorrect.'
    //   })
    // }
});

exports.updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.avatar = req.body.avatar || user.avatar;
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            avatar: updatedUser.avatar,
            token: generateToken(updatedUser._id),
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})
