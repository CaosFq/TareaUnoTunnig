const Users = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.validExistUser = catchAsync(async (req, res, next) => {
   
  const { id } = req.params;

  const user = await User.findOne({
    attributes: ['id', 'email', 'password'],
    where: {
      id,
      staus: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
  }

  req.user = user;
  next();

});

