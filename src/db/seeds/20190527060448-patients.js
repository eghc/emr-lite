"use strict";

//#1
const faker = require("faker");

//#2
let patients = [];

let genders = ['female', 'male', 'decline to say', 'none'];

for(let i = 1 ; i <= 40 ; i++){
  let p = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    dob: new Date(),
    icon: "/images/avatars/avatar_" + (i%10).toString() + ".png",
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: faker.random.arrayElement(genders),
    query: ""
  };
  p.query = i+p.firstname.toLowerCase()+p.lastname.toLowerCase();
  patients.push(p);
}

//#3
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert("Person", [{
        name: "John Doe",
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("Patients", patients, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete("Person", null, {});
    */
    return queryInterface.bulkDelete("Patients", null, {});
  }
};
