const Contact = require("./models").Contact;
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;


module.exports = {
  create(patientId, body, callback){
    return Contact.create({
      patientId: patientId,
      email: body.email,
      homephone: body.homephone,
      cellphone: body.cellphone,
      street1: body.street1,
      street2: body.street2,
      state: body.state,
      zip: body.zip
    }).then((contact) => {
      callback(null, contact);
    })
    .catch((err) => {
      callback(err);
    })

  },
  getRecent(patientId, callback){

    return Contact.findOne({
      where: {
          patientId: patientId,
      },
          order: [ [ 'createdAt', 'DESC' ]],
    })
    .then((contact) => {
      //console.log(items);
      callback(null, contact);
    })
    .catch((err) => {
      callback(err);
    })

  },
  getAll(patientId, callback){
    return Contact.findAll({
      where: {
        patientId: patientId
      },
      order: [ [ 'createdAt', 'DESC' ]]
    }).then((contacts) => {
      //con
      callback(null,contacts);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
