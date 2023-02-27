const catchAsync = require('../utils/catchAsync');
const User = require('../models/users.model');
const AppError = require('../utils/appError');

exports.findAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email'],
    where: {
      status: 'available',
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'Users found',
    users,
  });
});

exports.findOneUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  return res.status(200).json({
    status: 'success',
    message: 'User Found',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  console.log(user);

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, email } = req.body;

  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'sucess',
    message: 'User deleted successfully ',
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPAssword } = req.body;

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Incorrect password', 401)); //codigo 401 implica no autorizado
  }
  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(newPAssword, salt);

  await user.update({
    password: encriptedPassword, 
    passwordChangedAt: new Date(),
  });

  res.status(200).json({
    message: 'The user password was updated successfully'
  });
});
