const Appointments = require("./models").Appointments;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {


  addAppointment(patientId, body, callback){
    //console.log(JSON.parse(newPatient));
    // return 0;
    return Appointments.create({
      patientId: patientId,
      provider: body.provider,
      location: body.location,
      appt_date: body.appt_date,
      status: body.status
    })
    .then((appt) => {
      callback(null, appt);
    })
    .catch((err) => {
      callback(err);
    })
  },
  findAppointments(begindate, enddate, callback){

    return Appointments.findAll({
      where: {
        appt_date: {
          [Op.between]: [begindate, enddate]
        }
      }
    }).then((appts) => {
      //con
      callback(null,appts);
    })
    .catch((err) => {
      callback(err);
    })

  },
  getAppointments(patientId, callback){
    //let updatedPatient = patient;
    return Appointments.findAll({
      where: {
        patientId: patientId
      }
    })
    .then((appts) => {
       callback(null, appts);
     })
     .catch((err) => {
       callback(err);
     });

  },
  getFutureAppointments(patientId, callback){
    let today = new Date();
    return Appointments.findAll({
      where: {
        patientId: patientId,
        appt_date:{
          [Op.gt]: today
        }
      },
      order: [['appt_date', 'ASC']]
    })
    .then((appts) => {
       callback(null, appts);
     })
     .catch((err) => {
       callback(err);
     });
  }
}
