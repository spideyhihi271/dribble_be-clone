const Comment = require("../models/Comment");
const User = require("../models/User");
const formatData = require("../../utils/formatData");
const filtertData = require("../../utils/filterData");

class CommentController {
  async postNewComment(req, res) {
    try {
      let data = { idOwner: req.user.id, ...req.body };
      let comment = new Comment(data);
      await comment.save();
      res.status(200).json("Your comments was uploaded");
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async getCommentByIdShort(req, res) {
    try {
      let comments = await Comment.find({idShort: req.params.idShort});
      let users = await User.find({});
      let data = formatData.mutipleComment(comments, users);
      res.status(200).json(data.reverse());
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async updateComment(req, res) {
    try {
      let data = await Comment.findById(req.params.id);
      let updateData = data.toObject();
      if(updateData.idOwner == req.user.id){
        updateData.content = req.body.content;
        await Comment.findByIdAndUpdate(req.params.id, updateData);
        return res.status(200).json('Your comments updated successfully');
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

module.exports = new CommentController();
