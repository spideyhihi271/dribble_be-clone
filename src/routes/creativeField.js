const express = require("express");
const router = express.Router();
const creativeFieldController = require("../app/controllers/CreativeFieldController");


// GET api/v1/comment/getAll/:id
router.get('/', creativeFieldController.getAll);

module.exports = router;
