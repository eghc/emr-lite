const appointmentQueries = require("../db/queries.appointments.js");
const locationQueries = require("../db/queries.locations.js");
const providerQueries = require("../db/queries.providers.js");


module.exports = {
  createAppt(req, res, next){
    //check that the provider exists
    //check that the location exists
    // locationQueries.getLocation(req.body.location, (err0, location) => {
    //   if(err0){
    //     res.send(400);
    //   }else{
    //     providerQueries.getProvider(req.body.provider, (err1, provider) => {
    //       if(err1){
    //         res.send(400);
    //       }else{
    let data = {
      appt_date: new Date(req.body.appt_date),
      provider: parseInt(req.body.provider),
      location: parseInt(req.body.location),
      status: "booked",
    }
    console.log(data);
            appointmentQueries.addAppointment(req.params.id, data, (err2, appt) => {
              console.log(err2);
              if(err2){
                res.send(400);
              }else{
                res.send(appt);
              }
            });
    //       }
    //     });
    //   }
    // });
  },
  getAppts(req, res, next){
    appointmentQueries.getRecentAppointments(req.params.id, (err, appts) => {
      if(err){
        res.send(400);
      }else{
        res.send(appts);
      }
    });

  }

}
