const providerQueries = require("../db/queries.providers.js");

module.exports = {
  getProviders(req, res, next){
    providerQueries.getProviders((err, providers) =>{
      if(err){
        res.send(400);
      }else{
        res.send(providers);
      }
    });
  }
}
