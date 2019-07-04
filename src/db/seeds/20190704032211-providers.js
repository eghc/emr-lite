'use strict';
//const faker = require("faker");

let randomLastNames = [
  "Clayton",
  "Harris",
  "Clark",
  "Diamond",
  "Perlin",
  "Sniff",
  "Kaplan",
  "Lilya",
  "Lincoln",
  "Hirst"
]

let providers = [];
for(let i = 1 ; i <= 10 ; i++){
  providers.push({
    name: "Dr. " + randomLastNames[i],
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
    return queryInterface.bulkInsert("Providers", providers, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Providers", null, {});
  }
};
