module.exports = {
  init(app){
    const staticRoutes = require("../routes/static");
    const patientsRoutes = require("../routes/patients");
    app.use(staticRoutes);
    app.use(patientsRoutes);
  }
}
