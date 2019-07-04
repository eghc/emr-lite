const Providers = require("./models").Provider;


module.exports = {
  getProviders(callback){
    return Providers.findAll()
    .then((providers) => {
      //con
      callback(null,providers);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getProvider(id, callback){
    //let updatedPatient = patient;
    return Provider.findById(id)
     .then((provider) => {
       callback(null, provider);
     })
     .catch((err) => {
       callback(err);
     });

  }

}
