const formatData = require("../../utils/formatData");
const Address = require("../models/Address");
const CreativeField = require("../models/CreativeField");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

class UserController {
  async getUserById(req, res) {
    try {
      let user = await User.findById(req.params.id);
      let address = await Address.find({});
      let creativeField = await CreativeField.find({});
      let data = formatData.sigleUser(user, address, creativeField);
      delete data.password;
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async updateInfo(req, res) {
    try {
      let data = req.body;
      let user = await User.findById(req.user.id);
      user = user.toObject();
      // Autho
      if (user._id != req.user.id)
        return res.status(403).json("You are not allow to do that");
      // Change
      user = Object.assign(user, data);
      await User.findByIdAndUpdate(user._id, user);
      res.status(200).json("Your info was updated");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async updatePassword(req, res) {
    try {
      let data = req.body;
      let user = await User.findById(req.user.id);
      // Autho
      if (user._id != req.user.id)
        return res.status(403).json("You are not allow to do that");
      // Check old pass
      if (!bcrypt.compareSync(data.oldPass, user.password))
        return res.status(200).json({
          code: 0,
          message: "Wrong password. Please check again!",
        });
      // Check old pass
      if (bcrypt.compareSync(data.newPass, user.password))
        return res.status(200).json({
          code: 1,
          message: "Same old password. Please check again!",
        });
      // Update pass
      user.password = bcrypt.hashSync(data.newPass, salt);
      await User.findByIdAndUpdate(user._id, user);
      res.status(200).json({
        code: 2,
        message: "Change password successfully!",
      });
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async updateMore(req, res) {
    try {
      let data = req.body;
      let user = await User.findById(req.params.id);
      // Autho
      if (user._id != req.user.id)
        return res.status(403).json("You are not allow to do that");
      // Update
      user = Object.assign(user.toObject(), data);
      await User.findByIdAndUpdate(user._id, user);
      res.status(200).json("Your account was updated");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async updateSocial(req, res) {
    try {
      let data = req.body;
      let user = await User.findById(req.user.id);
      // Autho
      if (user._id != req.user.id)
        return res.status(403).json("You are not allow to do that");
      // Update
      user = user.toObject();
      user.socialNetworks = data;
      await User.findByIdAndUpdate(user._id, user);
      res.status(200).json("Your account was updated");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async updateSkills(req, res) {
    try {
      let data = req.body;
      let user = await User.findById(req.user.id);
      // Autho
      if (user._id != req.user.id)
        return res.status(403).json("You are not allow to do that");
      // Update
      user = user.toObject();
      user = Object.assign(user, data);
      await User.findByIdAndUpdate(user._id, user);
      res.status(200).json("Your account was updated");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async updateFollow(req, res) {
    try {
      let idFollow = req.user.id;
      let user = await User.findById(req.params.id);
      // Check
      user = user.toObject();
      let followList = user.folllows;
      let isExist = followList.includes(idFollow);
      if (isExist) {
        followList = followList.filter((item) => item != idFollow);
      } else {
        followList.unshift(idFollow);
      }
      user.folllows = followList;
      await User.findByIdAndUpdate(user._id, user);
      res.status(200).json("Follow updated!");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}

module.exports = new UserController();
