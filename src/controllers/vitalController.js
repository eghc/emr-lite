const vitalQueries = require("../db/queries.vitals.js");

module.exports = {

  updateVital(req, res, next){
    //TODO: change strings to integers
    let data = {
      height: parseInt(req.body.height),
      weight: parseInt(req.body.weight),
      bodytemp: parseInt(req.body.bodytemp),
      heartrate: parseInt(req.body.heartrate),
      blood: req.body.blood,
      resprate: parseInt(req.body.resprate)
    }
    //console.log(data.weight);
    //res.send(200);

    vitalQueries.create(req.params.id, data, (err, vital) => {
      if(err){
        res.send(400);
      }else{
        res.send(vital);
      }
    });
  },

  getVitals(req, res, next){
    vitalQueries.getAll(req.params.id, (err, vitals) => {
      if(err){
        res.send(400);
      }else{
        res.send(vitals);
      }
    });

  },
  
  getRecentVital(req, res, next){
    vitalQueries.getRecent(req.params.id, (err, vital) => {
      if(err){
        res.send(400);
      }else{
        res.send(vital);
      }
    });
  }
}
