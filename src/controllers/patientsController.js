const patientQueries = require("../db/queries.patients.js");
const contactQueries = require("../db/queries.contacts.js");
const vitalQueries = require("../db/queries.vitals.js");
const appointmentQueries = require("../db/queries.appointments.js");
const providerQueries = require("../db/queries.providers.js");
const locationQueries = require("../db/queries.locations.js");

module.exports = {
  // router.get('/api/hello', (req, res) => {
  //   res.send("testing");
  // });
  getPatients(req, res, next){
    //res.send("testing");
    //console.log(req.params.begin);
    //console.log(req.params.limit);
    patientQueries.getAllPatientsInRange(req.params.begin,req.params.limit, (err, patients) => {
        if(err){
          res.send(err);
        } else {
          //console.log(patients);
          res.send(patients);
        }
      });
  },


  findPatients(req, res, next){
    //console.log("in here");
    patientQueries.findPatients(req.params.query.toLowerCase(),(err, patients) => {
      //console.log(req.params.query);
        if(err){
          //console.log(err);
          res.send(err);
        } else {
          //console.log(patients);
          res.send(patients);
        }
      });

  },

  getPatient(req,res,next){
    patientQueries.getPatient(req.params.id, (err, patient) => {
      if(err){
        //console.log(err);
        res.send(400);
      } else {
        //TODO: get most recent contact information
        contactQueries.getRecent(req.params.id, (err1, contact) => {
          //console.log(patient);
          //console.log(contact);
          if(err1){
            res.send(400);
          }else{
            //console.log("1");
            vitalQueries.getRecent(req.params.id, (err2, vital) => {
              //onsole.log(err2);
              if(err2){
                res.send(400);
              }else{
                appointmentQueries.getAppointments(req.params.id, (err3, appts) => {
                  let today = new Date();
                  if(err3){
                    res.send(400);
                  }else{
                    let apptsFuture = [];
                    let apptsPast = [];
                    appts.map(appt => {
                      //console.log(appt.dataValues.provider);
                      providerQueries.getProvider(appt.provider, (err4, provider) => {
                        if(err4){
                          console.log(err4);
                          res.send(400);
                        }else{

                          appt.dataValues.provider = {
                            id: provider.id,
                            name: provider.name
                          };


                          locationQueries.getLocation(appt.location, (err5, location) =>{
                            if(err5){
                              console.log(err5);
                              res.send(400);
                            }else{
                              appt.dataValues.location = {
                                id: location.id,
                                name: location.name
                              };

                              //push to either future or past appt array
                              if(appt.dataValues.appt_date >= today){
                                console.log("future");
                                apptsFuture.push(appt);
                              }else{
                                console.log("past");
                                apptsPast.push(appt);
                              }


                              if((apptsFuture.length + apptsPast.length) >= appts.length){
                                //console.log(apptsNew);
                                res.send({
                                  patient: patient,
                                  contact: contact,
                                  vital: vital,
                                  appts: {
                                    future: apptsFuture,
                                    past: apptsPast
                                  }
                                });
                              }

                            }


                          });

                        }
                      });
                    });



                  }
                });
                //console.log("2");

              }
            });
          }
        })
      }
    });
  },

  addPatient(req,res,next){
    //console.log(req.body);
    patientQueries.addPatient(req.body, (err, patient)=>{
      if(err){
        console.log(err);
        res.send(400);
      }else{
        //update query to include ID
        patientQueries.updatePatientQuery(patient, (e, p)=>{
          if(e){
            res.send(400);
          }else{
            //TODO: create contact
            //console.log(req.body);
            contactQueries.create(patient.id, req.body, (ee, contact) =>{
              //console.log(ee);
              if(ee){
                res.send(400);
              }else{
                res.send(200);
              }
            });
          }
        });
      }

    });


  }
}
