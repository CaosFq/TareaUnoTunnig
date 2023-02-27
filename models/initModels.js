const Repair = require("./repairs.models");
const User = require("./users.model");




const initModel = () => {
 User.hashMany(Repair);
 Repair.bleongsTo(User);
};
module.exports = initModel;