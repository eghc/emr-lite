'use strict';
//const faker = require("faker");

let randomCities = [
  "Ojai",
  "Santa Barbara",
  "Ventura",
  "Camarillo",
  "Carpinteria"
]

let locations = [];
for(let i = 0 ; i < randomCities.length ; i++){
  locations.push({
    name: randomCities[i],
    createdAt: new Date(),
    updatedAt: new Date()
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Locations", locations, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Locations", null, {});
  }
};
