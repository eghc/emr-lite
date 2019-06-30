const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");
router.post("/updateContact/:id", contactController.updateContact);
router.get("/getContacts/:id", contactController.getContacts);
router.get("/getRecentContact/:id", contactController.getRecentContact);

module.exports = router;
