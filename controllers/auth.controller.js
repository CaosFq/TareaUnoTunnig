const catchAsync = require("../utils/catchAsync");
const User = require('../models/user.model');

exports.createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;
  
    const user = await User.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password,
      role,
    });
    return res.status(201).json({ 
      status: 'success',
      message: 'User created',
      user,
    });
  });