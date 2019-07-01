'use strict';
module.exports = (sequelize, DataTypes) => {
  var Vital = sequelize.define('Vital', {
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    bodytemp: DataTypes.INTEGER,
    heartrate: DataTypes.INTEGER,
    blood: DataTypes.STRING,
    resprate: DataTypes.INTEGER
  }, {});
  Vital.associate = function(models) {
    // associations can be defined here
    Vital.belongsTo(models.Patient, {
      foreignKey: "patientId",
      onDelete: "CASCADE"
    });
  };
  return Vital;
};
