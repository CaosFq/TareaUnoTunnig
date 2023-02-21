class AppError extends Error {//Los errore que entran por esta clase son operacionales
  //trae propiedades de Error
  constructo(message, statusCode) {
    super(message); //ejecuta el constructor de la clase padre, recibe solo el mensaje
    this.statusCode = statusCode;
    //Obs. para los codigos 400 usa error y para los 500 fiel
    this.status=`${statusCode}`.startsWith('4') ? 'error' : 'fail';//startsWith me indica que el codigo de estado empieza con...."lo que que pongo entre parentesis"si empieza con 4(?) sino sera fail

    //Si es un error operacional pondre true:
    this.isOperational = true;

    Error.captureStackTrace(this, this.cons)
  }
}
module.exports = AppError;
