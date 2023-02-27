const { Router } = require('express');
const{ check } = require('express-validator');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');
const {protect, protectAccountOwner, restrictTo } = require('../middlewares/auth.middleware');
const { validExistRepair } = require('../middlewares/repairs.middleware');
const { validateFields } = require('../middlewares/validateField.middeleware');

const router = Router();

router.get('/', findAllRepairs);

router.get('/:id',validExistRepair, findOneRepair);

router.use(protect);
router.patch(
  '/:id',
  [
    check('date', 'The date must mandatory').not().isEmpty(),
    check('motorsNumber', 'The motorNumber must mandatory').not().isEmpty(),
    check('description', 'The description must mandatory').isEmail(),
    validateFields,
    restrictTo('employee'),
    validExistRepair,
  ],
  updateRepair

);



router.delete('/:id',validExistRepair, deleteRepair);

module.exports = {
  repairRouter: router,
};
