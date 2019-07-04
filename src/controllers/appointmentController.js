const appointmentQueries = require("../db/queries.appointments.js");
const locationQueries = require("../db/queries.locations.js");
const providerQueries = require("../db/queries.providers.js");


module.exports = {
  createAppt(req, res, next){
    //check that the provider exists
    //check that the location exists
    locationQueries.getLocation(req.body.location, (err0, location) => {
      if(err0){
        res.send(400);
      }else{
        providerQueries.getLocation(req.body.provider, (err1, provider) => {
          if(err1){
            res.send(400);
          }else{
            appointmentQueries.create(req.params.id, req.body, (err2, appt) => {
              if(err2){
                res.send(400);
              }else{
                res.send(appt);
              }
            });
          }
        });
      }
    });
  },
  getAppts(req, res, next){
    appointmentQueries.getAll(req.params.id, (err, appts) => {
      if(err){
        res.send(400);
      }else{
        res.send(appts);
      }
    });

  }

}
