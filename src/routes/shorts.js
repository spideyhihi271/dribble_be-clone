const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortController = require("../app/controllers/ShortController");
const tokenMiddleWare = require("../app/middlewares/tokenMiddleWare");

// Cài đặt nơi lưu trữ tạm thời
const upload = multer({ storage: multer.memoryStorage() });

// POST api/v1/short/addImage
router.post("/addImage", upload.single("file"), shortController.postNewImage);
// POST api/v1/short/addShort
router.post('/addShort', tokenMiddleWare.veryfyToken, shortController.postNewShort);
// GET api/v1/short/like
router.patch('/like/:id', tokenMiddleWare.veryfyToken, shortController.likeShortById)
// DELETE api/v1/short/deleted/:id
router.delete('/deleted/:id', tokenMiddleWare.veryfyToken, shortController.deleteShortById)
// GET api/v1/short/
router.get('/:id', shortController.getShortById);
// GET api/v1/short/
router.get('/', shortController.getAllShort)

module.exports = router;
