'use strict';
module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define('Location', {
    name: DataTypes.STRING
  }, {});
  Location.associate = function(models) {
    // associations can be defined here
    Location.hasMany(models.Appointments, {
       foreignKey: "location",
       as: "appts"
     });
  };
  return Location;
};
