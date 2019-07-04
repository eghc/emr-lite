const locationQueries = require("../db/queries.locations.js");

module.exports = {
  getLocations(req, res, next){
    locationQueries.getLocations((err, locations) =>{
      if(err){
        res.send(400);
      }else{
        res.send(locations);
      }
    });
  }
}
