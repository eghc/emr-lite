'use strict';
module.exports = (sequelize, DataTypes) => {
  var Patient = sequelize.define('Patient', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middlename:{
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false
    },
    icon:{
      type: DataTypes.STRING,
      allowNull: false
    },
    gender:{
      type: DataTypes.STRING,
      allowNull: false
    },
    query:{
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
    Patient.hasMany(models.Contact, {
     foreignKey: "patientId",
     as: "contacts"
   });
  };
  return Patient;
};
