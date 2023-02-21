//Capturador de errores de mi aplicacion
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.statusCode = err.status || 'fall';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
module.exports = globalErrorHandler;
