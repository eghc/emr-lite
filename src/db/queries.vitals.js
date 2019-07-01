const Vitals= require("./models").Vital;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  create(patientId, body, callback){
    return Vitals.create({
      patientId: patientId,
      height: body.height,
      weight: body.weight,
      bodytemp: body.bodytemp,
      heartrate: body.heartrate,
      blood: body.blood,
      resprate: body.resprate
    }).then((vital) => {
      callback(null, vital);
    })
    .catch((err) => {
      callback(err);
    })

  },
  getRecent(patientId, callback){

    return Vitals.findOne({
      where: {
          patientId: patientId,
      },
          order: [ [ 'createdAt', 'DESC' ]],
    })
    .then((vital) => {
      callback(null, vital);
    })
    .catch((err) => {
      callback(err);
    })

  },
  getAll(patientId, callback){
    return Vitals.findAll({
      where: {
        patientId: patientId
      },
      order: [ [ 'createdAt', 'DESC' ]]
    }).then((vitals) => {
      callback(null,vitals);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
