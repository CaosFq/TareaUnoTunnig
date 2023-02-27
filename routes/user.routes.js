const { Router } = require('express');
const { check } = require('express-validator');

const {
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
  updatePassword,
} = require('../controllers/user.controllers');
const { validExistUser } = require('../middlewares/users.middleware');
const { validateFields } = require('../middlewares/validateField.middeleware');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id', validExistUser, findOneUser);

router.patch(
  '/:id',
  [
    check('name', 'The username must mandatory').not().isEmpty(),
    check('email', 'The email must mandatory').not().isEmpty(),
    check('email', 'The email must be a correct format').isEmail(),
    validateFields,
    
    validExistUser,
  ],
  updateUser
);
router.patch(
  '/password/:id', 
[
  check('current/Password', 'The current password must be mandatory')
  .not()
  .isEmpty(),
  check('newPassword', 'The current password must be mandatory').not().isEmpty(),
  validateFields,
  validExistUser
],
updatePassword
);

router.delete('/:id', validExistUser, deleteUser);

module.exports = {
  userRouter: router,
};
