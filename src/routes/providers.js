const express = require("express");
const router = express.Router();

const providerController = require("../controllers/providerController");
router.get("/getProviders", providerController.getProviders);

module.exports = router;
