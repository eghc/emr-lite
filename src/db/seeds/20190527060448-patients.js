"use strict";

//#1
//const faker = require("faker");

//#2
let patients = [];

let genders = ['female', 'male', 'decline to say', 'none'];

let randomFirstNames = [
  "Jess",
  "Kyle",
  "Nate",
  "Emma",
  "Michael",
  "Devon",
  "Amanda",
  "Jessie",
  "Amanda",
  "Jennifer"
]

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

for(let i = 0 ; i < 10 ; i++){
  let p = {
    firstname: randomFirstNames[i],
    lastname: randomLastNames[i],
    dob: new Date(),
    icon: "/images/avatars/avatar_" + (i%10).toString() + ".png",
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: genders[i%genders.length],
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
