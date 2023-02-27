const Users = require('../models/repairs.model');
const catchAsync = require('../utils/catchAsync');

exports.validExistRepair = catchAsync(async (req, res, next) => {
   
  const { id } = req.params;

  const user = await Repair.findOne({
    attributes: ['date', 'motorNumber', 'description'],
    where: {
      id,
      staus: 'pending',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 'error',
      message: 'Repair not found',
    });
  }

  req.repair = repair;
  next();

});