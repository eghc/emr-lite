module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const patientsRoutes = require("../routes/patients");
    const contactRoutes = require("../routes/contacts");
    const vitalRoutes = require("../routes/vitals");
    app.use(staticRoutes);
    app.use(patientsRoutes);
    app.use(contactRoutes);
    app.use(vitalRoutes);
  }
}
