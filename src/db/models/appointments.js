'use strict';
module.exports = (sequelize, DataTypes) => {
  var Appointments = sequelize.define('Appointments', {
    provider: DataTypes.INTEGER,
    location: DataTypes.INTEGER,
    appt_date: DataTypes.DATE,
    status: DataTypes.STRING,
    patientId: DataTypes.INTEGER
  }, {});
  Appointments.associate = function(models) {
    // associations can be defined here
    Appointments.belongsTo(models.Patient, {
      foreignKey: "patientId",
      onDelete: "CASCADE"
    });

    Appointments.belongsTo(models.Provider, {
      foreignKey: "provider",
      onDelete: "CASCADE"
    });

    Appointments.belongsTo(models.Location, {
      foreignKey: "location",
      onDelete: "CASCADE"
    });
  };
  return Appointments;
};
