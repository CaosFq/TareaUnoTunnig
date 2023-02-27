const Repair = require('../models/repairs.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.findAllRepairs = catchAsync(async (req, res, next) => {
  
  const repairs = await Repair.findAll({
    attributes: ['id', 'date', 'userId'],
    where: {
      status: 'pending',
    },  
  });

  return res.status(200).json({
    status: 'success',
    repairs,
  });
} );
  


exports.findOneRepair = catchAsync(async (req, res, next) => {
   
  const { id } = req.params;

  const repair = await Repair.findOne({
    attributes: ['id', 'date', 'userId'],
    where: {
      id,
      staus: 'pending',
    },
  });

  if(!repair){
     return res. status(404).json({
      status:'error',
      message: 'Repair not found',

     });
  };

  return res.status(200).json({
      status: 'success',
       repair,
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  
  const { date, userId } = req.body;

  const repair = await Repair.create({
    date,
    userId,
     });
  return res.status(201).json({
    status: 'success',
    message: 'Created Repair',
    repair,
  });

});

exports.updateRepair =catchAsync( async (req, res, next) => {
  
  const { id } = req.params;
  const { status } = req.body;

  const repair = await Repair.findOne({
    attributes: ['id', 'date', 'userId'],
    where: {
      id,
      staus: 'pending',
},
});

if(!repair){
return res. status(404).json({
 status:'error',
 message: 'Repair not found',

});
}
await repair.update({status});

return res.status(200).json({
status: 'success',

 });

});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  
  const { id } = req.params;
  

  const repair = await Repair.delete({
    attributes: ['id', 'date', 'userId'],
    where: {
      id,
      staus: 'pending',

    },

    });

    if(!repair){
     return res. status(404).json({
      status:'error',
      message: 'Repair not found',
   
     });
   }
await repair.update({ status: 'cancelled'})

res.status(200).json({
status: 'sucess',
message: 'Repair deleted successfully ',                                                                                                                    
});

});
