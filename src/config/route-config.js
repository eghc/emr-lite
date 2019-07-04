module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const patientsRoutes = require("../routes/patients");
    const contactRoutes = require("../routes/contacts");
    const vitalRoutes = require("../routes/vitals");
    const apptsRoutes = require("../routes/appointments");
    const providerRoutes = require("../routes/providers");
    const locationRoutes = require("../routes/locations");
    app.use(staticRoutes);
    app.use(patientsRoutes);
    app.use(contactRoutes);
    app.use(vitalRoutes);
    app.use(apptsRoutes);
    app.use(providerRoutes);
    app.use(locationRoutes);
  }
}
