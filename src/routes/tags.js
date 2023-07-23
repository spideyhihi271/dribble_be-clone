const express = require("express");
const router = express.Router();
const tagController = require("../app/controllers/TagController");


// GET api/v1/comment/getAll/:id
router.get('/', tagController.getAllTag);

module.exports = router;
