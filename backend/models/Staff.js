'use strict';
module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define('Staff', {
    name: DataTypes.STRING,
    mobileNo: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Staff.associate = function(models) {
    // associations can be defined here
    Staff.hasMany(models.Student,{onDelete:'cascade'});
  };
  return Staff;
};