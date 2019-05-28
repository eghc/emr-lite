const express = require("express");
const router = express.Router();

const patientsController = require("../controllers/patientsController");
router.get("/getPatients/:begin/:limit", patientsController.getPatients);
router.get("/patient/:id", patientsController.getPatient );
router.get("/getPatients/:query",patientsController.findPatients);

module.exports = router;
