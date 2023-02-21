const express = require('express');
const cors = require('cors');
const { db } = require('../database/db');
const { userRouter } = require('../routes/user.routes');
const { repairRouter } = require('../routes/repair.routes');
const globalErrorHandler = require('../controllers/error.controller');
const AppError = require('../utils/appError');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Path Routes
    this.paths = {
      repairs: '/api/v1/repairs',
      users: '/api/v1/users',
    };

    //Connect to db
    this.database();

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes() {
    this.app.use(this.paths.users, userRouter);
    this.app.use(this.paths.repairs, repairRouter);
   //Si alguna de la rutas anteriores no se encuentra:
    //Verifica que las rutas ingresadas sean correctas:
   // this.app.all('*', (req, res, next) => {
      //res.status(404).json({//cuando una ruta no se encuentra el código es 404
        // status:'error',
      //  message :`Can't find ${req.originalUrl}on this server`,//OriginalUrl es la url que digita el usuario
       // });

  //  });
  this.app.all('*', (req, res, next) => {
   return next(new AppError(`Can't find ${req.originalUrl}on this server`, 404));

    });
    
      this.app.use(globalErrorHandler)
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(err => console.log(err));

    //relations

    db.sync()
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
