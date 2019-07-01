const patientQueries = require("../db/queries.patients.js");
const contactQueries = require("../db/queries.contacts.js");
const vitalQueries = require("../db/queries.vitals.js");

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
                //console.log("2");
                res.send({
                  patient: patient,
                  contact: contact,
                  vital: vital
                });
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
