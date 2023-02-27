const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { userRouter } = require('../routes/user.routes');
const { repairRouter } = require('../routes/repair.routes');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');
const { authRouter } = require('../routes/auth.routes');
const initModel = require('./initModels');
c



class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Definimos los PATHS de nuestra aplicación
    this.paths = {
      repairs: '/api/v1/repairs',
      users: '/api/v1/users',
      auth: '/api/v1/auth',
    };

    //Llamo al método de conexión a la base de datos
    this.database();

    //Invocamos a el metodo Middlewares
    this.middlewares();

    //Invocamos el método Routes
    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    //Utilizamos las cors para permitir el acceso a la API
    this.app.use(cors());
  }
  routes() {
    //Importante: la ruta siempre tiene que arriba de los errores
    this.app.use(this.paths.users, userRouter);
    this.app.use(this.paths.repairs, repairRouter);
    this.app.use(this.paths.auth, authRouter); //implemento la ruta para que se pueda buscar

    this.app.all('*', (req, res, next) => {
      return next(
        new AppError(`Can't find ${req.originalUrl}on this server`, 404)
      );
    });

    this.app.use(globalErrorHandler);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    //relations
    initModel();

    db.sync(/*{ force: true }*/) //¡¡¡Danger-Peligro!!!*****No hacer en el trabajo******Borra los datos de la aplicación
      //*************En el trabajo se realiza desde la base de datos*****************
      //***************Solo lo realizamos para que se sincronice******************
      //Obs: muy importante para la practica agregue: {force: true}, una vez sincronizada, lo borro!!!.
      .then(() => console.log('Database synced'))
      .catch(err => console.log(err));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server Running On Port ', this.port);
    });
  }
}
module.exports = Server;
