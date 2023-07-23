const User = require("../models/User");
const Short = require("../models/Short");
const Address = require("../models/Address");
const CreativeField = require("../models/CreativeField");
const formatData = require("../../utils/formatData");
const filtertData = require("../../utils/filterData");

class collectionController {
  async getAllHire(req, res) {
    try {
      let shorts = await Short.find({ deleted: false });
      let users = await User.find({});
      let creativeFields = await CreativeField.find({});
      let address = await Address.find({});
      let data = formatData.hire(users, shorts, address, creativeFields);
      data = filtertData.forHire(data, req.body);
      res.status(200).json(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}

module.exports = new collectionController();
