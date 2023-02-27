const { promisify } = require('util');
const Jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.protect = catchAsync(async (req, res, next) => {
  //**************************Pasos para proteger la ruta*************************

  //1.Getting token and check of it 's there,Obtener token y comprobar que está allí
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  //2.Verification token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED
  );

  //3. Check if user still exists,Compruebe si el usuario todavía existe
  const user = await User.findOne({
    Where: {
      id: decoded.id,
      status: true,
    },
  });

  if (!user) {
    return next(
      new AppError('The owner of this token not longer available', 401)
    );
  }
  //4. Check if user changed password after token was issued,Verifique si el usuario cambió la contraseña después de que se emitió el token
  next();
});
