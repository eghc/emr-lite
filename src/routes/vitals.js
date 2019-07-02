const express = require("express");
const router = express.Router();

const vitalController = require("../controllers/vitalController");
router.post("/updateVital/:id", vitalController.updateVital);
router.get("/getVitals/:id", vitalController.getVitals);
router.get("/getRecentVital/:id", vitalController.getRecentVital);

module.exports = router;
