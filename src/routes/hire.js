const express = require("express");
const router = express.Router();
const hireController = require("../app/controllers/HireController");


// GET api/v1/collection
router.post('/', hireController.getAllHire);


module.exports = router;
