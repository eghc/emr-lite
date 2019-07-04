const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");
router.post("/createAppt/:id", appointmentController .createAppt);
router.get("/getAppts/:id", appointmentController.getAppts);

module.exports = router;
