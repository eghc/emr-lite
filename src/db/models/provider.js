'use strict';
module.exports = (sequelize, DataTypes) => {
  var Provider = sequelize.define('Provider', {
    name: DataTypes.STRING
  }, {});
  Provider.associate = function(models) {
    // associations can be defined here
    Provider.hasMany(models.Appointments, {
       foreignKey: "provider",
       as: "appts"
     });
  };
  return Provider;
};
