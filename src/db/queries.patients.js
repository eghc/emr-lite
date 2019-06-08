const Patients = require("./models").Patient;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {

//#1
  getAllPatientsInRange(begin, limit, callback){
    return Patients.findAll({
      where: {
        id: {
          [Op.gte]: begin
        }
      },
      limit: limit,
      order: [['updatedAt', 'DESC']]
    })
    .then((patients) => {
      callback(null, patients);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addPatient(newPatient, callback){
    //console.log(JSON.parse(newPatient));
    // return 0;
    let query = `${newPatient.firstName}${newPatient.lastName}`.toLowerCase();
    return Patients.create({
      firstname: newPatient.firstName,
      lastname: newPatient.lastName,
      dob: newPatient.dob,
      icon: '/images/avatars/avatar_1.png',
      gender: newPatient.gender,
      query: query
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  updatePatientQuery(patient, callback){
    //let updatedPatient = patient;
    return patient.update({
      query: `${patient.id}`+patient.query
    })
    .then(() => {
      callback(null, patient);
    })
    .catch((err) => {
      callback(err);
    });

  },
  findPatients(query, callback){

    return Patients.findAll({
      where: {
        query: {
          [Op.like]: '%' + query +'%'
        }
      }
    }).then((users) => {
      //con
      callback(null,users);
    })
    .catch((err) => {
      callback(err);
    })

  }
}
