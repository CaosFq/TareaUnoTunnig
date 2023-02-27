const { Router } = require('express');
const { check } = require('express-validator');

const {
  findAllUsers,
  findOneUser,
  updateUser,
  deleteUser,
  updatePassword,
} = require('../controllers/user.controllers');
const { protect, protectAccountOwner } = require('../middlewares/auth.middleware');
const { validExistUser } = require('../middlewares/users.middleware');
const { validateFields } = require('../middlewares/validateField.middeleware');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id', validExistUser, findOneUser);
router.use(protect);
router.patch(
  '/:id',
  [
    check('name', 'The name must mandatory').not().isEmpty(),
    check('email', 'The email must mandatory').not().isEmpty(),
    check('password', 'The password must be a correct format').isEmail(),
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
  check('newPassword', 'The new password must be mandatory').not().isEmpty(),
  validateFields,
  validExistUser,
  protectAccountOwner

],
updatePassword
);

router.delete('/:id', validExistUser, deleteUser);

module.exports = {
  userRouter: router,
};
