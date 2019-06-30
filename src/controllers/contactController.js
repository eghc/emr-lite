const contactQueries = require("../db/queries.contacts.js");

module.exports = {

  updateContact(req, res, next){
    contactQueries.create(req.params.id, req.body, (err, contact) => {
      if(err){
        res.send(400);
      }else{
        res.send(contact);
      }
    });
  },
  getContacts(req, res, next){
    contactQueries.getAll(req.params.id, (err, contacts) => {
      if(err){
        res.send(400);
      }else{
        res.send(contacts);
      }
    });

  },
  getRecentContact(req, res, next){
    contactQueries.getRecent(req.params.id, (err, contact) => {
      if(err){
        res.send(400);
      }else{
        res.send(contact);
      }
    });
  }
}
