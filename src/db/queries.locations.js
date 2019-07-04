const Locations = require("./models").Location;


module.exports = {
  getLocations(callback){

    return Locations.findAll()
    .then((locations) => {
      //con
      callback(null,locations);
    })
    .catch((err) => {
      callback(err);
    })

  },
  getLocation(id, callback){
    //let updatedPatient = patient;
    return Locations.findById(id)
     .then((location) => {
       callback(null, location);
     })
     .catch((err) => {
       callback(err);
     });

  }

}
