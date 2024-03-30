const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");


// validateToken for all the Routes
router.use(validateToken);

//Get all individual contacts
router.route("/").get(getContacts);

//Get individual contact
router.route("/:id").get(getContact);

//Create individual contacts
router.route("/").post(createContact);

//Update individual contacts
router.route("/:id").put(updateContact);

//Delete individual contacts
router.route("/:id").delete(deleteContact);

module.exports = router;
