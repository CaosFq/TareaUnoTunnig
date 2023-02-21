const catchAsync = fn =>{
    return(req, res, next) =>{
      fn(req, res, next).catch(next);//Aca ocurre la magia, pues captura de la promesa el error 
                                     //y se lo envia a la pila de errores y el error cae en el error.controller.js
    };
    };
    module.exports = catchAsync;