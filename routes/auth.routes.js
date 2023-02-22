const { check } = require("express-validator");
const { createUser } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validateField.middeleware");

const { Router } = requiere('express');

const router = Router();

router.post(
    '/signup', [ 
    
    //Se coloca la propiedad: 'name' seguida del mensaje:'El nombre de usuario es obligatorio'
    check('name', 'The username must mandatory').not().isEmpty(),//Se lee sino esta vacio pasa, es decir si tiene nombre pasa,
    // **********************************************************En caso de estar vacio se envia el mensaje de error*********

    //Validacion del correo electrónico:
   
    //Primero similar a lo que hicimos con el nombre pero ahora con el correo: si existe pasa
    //***********************************************************************: Sino existe se envia un mensaje de error
    check('email', 'The email must mandatory').not().isEmpty(),

    //Luego se puede validar el formato:
    check('email', 'The email must be a correct format').isEmail(),

    
    //Validacion del password:
    check('password', 'The password must be mandatory').not().isEmpty(),
validateFields,

],
createUser
);



module.exports = {
  authRouter: router,
};
