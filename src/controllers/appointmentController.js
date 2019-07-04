const appointmentQueries = require("../db/queries.appointments.js");
const locationQueries = require("../db/queries.locations.js");
const providerQueries = require("../db/queries.providers.js");


module.exports = {
  createAppt(req, res, next){

    let data = {
      appt_date: new Date(req.body.appt_date),
      provider: parseInt(req.body.provider),
      location: parseInt(req.body.location),
      status: "booked",
    }
    console.log(data);
            appointmentQueries.addAppointment(req.params.id, data, (err0, appt) => {
              console.log(err0);
              if(err0){
                res.send(400);
              }else{
                locationQueries.getLocation(data.location, (err1, location) => {
                  if(err1 || !location ){
                    res.send(400);
                  }else{
                    providerQueries.getProvider(data.provider, (err2, provider) => {
                      if(err2 || !provider){
                        res.send(400);
                      }else{
                        appt.dataValues.provider = {
                          id: provider.id,
                          name: provider.name
                        };

                        appt.dataValues.location = {
                          id: location.id,
                          name: location.name
                        };
                        
                        res.send(appt);
                      }
                    });
                  }

                });

              }
            });

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
