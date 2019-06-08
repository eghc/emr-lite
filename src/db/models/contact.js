'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contact = sequelize.define('Contact', {
    email: DataTypes.STRING,
    homephone: DataTypes.INTEGER,
    cellphone: DataTypes.INTEGER,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  Contact.associate = function(models) {
    // associations can be defined here
    Contact.belongsTo(models.Patient, {
      foreignKey: "patientId",
      onDelete: "CASCADE"
    });
  };
  return Contact;
};
