const express = require("express");
const router = express.Router();

const locationController = require("../controllers/locationController");
router.get("/getLocations", locationController.getLocations);

module.exports = router;
