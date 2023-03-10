const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role = 'user' } = req.body;

  //1. crear una instancia de la clase user
  const user = new User({ username, email, password, role });
  console.log(user);
  //2. encriptar la contraseña
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  //3. guardar en la base de datos cn las contraseñas encriptadas
  await user.save();
  //4. generar el jwt
  const token = await generateJWT(user.id);

  return res.status(201).json({
    status: 'success',
    message: 'User created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1. Check if user exist && password is correct
  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: true,
    },
  });
  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password, 401')); //codigo 401 implica no autorizado
  }
  //2. If everything ok, send token to client
  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});
