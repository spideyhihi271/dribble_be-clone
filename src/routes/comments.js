const express = require("express");
const router = express.Router();
const commentController = require("../app/controllers/CommentController");
const tokenMiddleWare = require("../app/middlewares/tokenMiddleWare");


// POST api/v1/comment/add
router.post('/', tokenMiddleWare.veryfyToken, commentController.postNewComment);
// POST api/v1/comment/update
router.patch('/update/:id', tokenMiddleWare.veryfyToken, commentController.updateComment);
// GET api/v1/comment/getAll/:id
router.get('/:idShort', commentController.getCommentByIdShort);

module.exports = router;
