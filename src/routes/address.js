const express = require("express");
const router = express.Router();
const AddressController = require("../app/controllers/AddressController");


// GET api/v1/comment/getAll/:id
router.get('/', AddressController.getAll);

module.exports = router;
