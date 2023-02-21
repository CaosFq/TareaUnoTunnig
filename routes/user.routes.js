const { Router } = require('express');
const { check } = require('express-validator');

const { 
    findAllUsers, 
    findOneUser, 
    createUser, 
    updateUser, 
    deleteUser, 
} = require('../controllers/user.controllers');
const { validExistUser } = require('../middlewares/users.middleware');
const { validateFields } = require('../middlewares/validateField.middeleware');



const router = Router();

router.get('/', findAllUsers);

router.get('/:id',validExistUser, findOneUser);

router.post('/', [ 
    
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

router.patch('/:id',[ 
    check('name', 'The username must mandatory').not().isEmpty(), 
    check('email', 'The email must mandatory').not().isEmpty(),  
    check('email', 'The email must be a correct format').isEmail(),
    validateFields,
    validExistUser, 
],
 updateUser
);


router.delete('/:id', validExistUser , deleteUser);

module.exports = {
    userRouter: router,
};