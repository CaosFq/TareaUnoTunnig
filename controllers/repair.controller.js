const Repair = require('../models/repairs.model');


exports.findAllRepairs = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.findOneRepair = async (req, res) => {
  try {
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
    }

    return res.status(200).json({
        status: 'success',
         repair,
    })
  } catch {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.createRepair = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
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
 
   })
 

}
  catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
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
})
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
