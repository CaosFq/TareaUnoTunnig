const AppError = require('../utils/appError');
 
const handleCastError22P02 = () =>{
  const message ='Some type of data send does not match was expeceted';
 return new AppError(message, 400);
 };

 const handleJWTError = () =>
new AppError('Invalid. Please login again!, 401');


const sendErrorDev = (err, res) =>{
  res.Status(err.statusCode).json({
    status: err.status,
    error:err,
    message: err.message,
    stack: err.stack,

  });
};

const sendErrorProd = (err, res)=>{
  //Operational, trusted error: send message to client
  if(err.IsOperational){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }else{
    //Programing or other unknown error: don't details
    console.error('ERROR',err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
});
    }
  };
if (process.env.NODE_ENV === 'development'){
  sendErrorDev(err, res);
}

if(process.env.NODE_ENV === 'production'){
  let error={...err };

  if(!error.parent?.code){
    error = err;
  }
  if (error.parent?.code === '22P02') error = handleCastError22P02(error);
  if (error.name ==='JsonWebTokenError') error = handleJWTError(error);

  sendErrorProd(error, res);

};
module.exports = globalErrorHandler;











