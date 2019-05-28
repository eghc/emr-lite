const patientQueries = require("../db/queries.patients.js");

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

  },

  addPatient(req,res,next){

  }
}
