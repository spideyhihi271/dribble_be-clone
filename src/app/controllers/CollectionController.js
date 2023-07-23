const Collection = require("../models/Collection");
const User = require("../models/User");
const Short = require("../models/Short");
const formatData = require("../../utils/formatData");
const filtertData = require("../../utils/filterData");

class collectionController {
  async postNewCollection(req, res) {
    try {
      let data = {
        ...req.body,
        idOwner: req.user.id,
        shorts: [],
        views: 0,
        deleted: false,
      };
      let newData = new Collection(data);
      await newData.save();
      res.status(200).json("Your collection was created!");
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async getAllCollection(req, res) {
    try {
      let collections = await Collection.find({ deleted: false });
      let shorts = await Short.find({});
      let users = await User.find({});
      let data = formatData.mutipleCollection(collections, shorts, users);
      data = filtertData.forCollection(data, req.query);
      res.status(200).json(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async getCollectionById(req, res) {
    try {
      let collection = await Collection.findOne({ _id: req.params.id });
      let shorts = await Short.find({});
      let users = await User.find({});
      let data = formatData.singleCollection(collection, shorts, users);
      res.status(200).json(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async updateCollection(req, res) {
    try {
      let data = req.body;
      let collection = await Collection.findById(req.params.id);
      let updateData = collection.toObject();
      console.log(updateData.idOwner);
      console.log(req.user);
      if (updateData.idOwner == req.user.id) {
        // Update thông tin
        updateData.name = data.name;
        updateData.description = data.description;
        await Collection.findByIdAndUpdate(updateData._id, updateData);
        res.status(200).json("Your collection was updated.");
      } else {
        res.status(403).json("Your are not allow to do that.");
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async updateShortInCollection(req, res) {
    try {
      let idShort = req.body.id;
      let collection = await Collection.findById(req.params.id);
      let updatedData = collection.toObject();
      if (collection.idOwner == req.user.id) {
        // Kiểm tra có tồn tại chưa
        let isExist = false;
        updatedData.shorts.map((short) => {
          if (short == idShort) {
            isExist = true;
          }
        });
        // Cập nhật
        let updatedShorts = updatedData.shorts;
        if (isExist) {
          updatedShorts = updatedShorts.filter((item) => item != idShort);
        } else {
          updatedShorts.unshift(idShort);
        }
        updatedData.shorts = updatedShorts;
        await Collection.findByIdAndUpdate(req.params.id, updatedData);
        res.status(200).json("Update successful");
      } else {
        res.status(403).json("Your are not allow to do that.");
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async deletedCollection(req, res) {
    try {
        let collection = await Collection.findById(req.params.id);
        let deletedCollection = collection.toObject();
        if(deletedCollection.idOwner != req.user.id){
            return res.status(403).json('You are not allow to do that')
        }
        // Logic xóa
        deletedCollection.deleted = true;
        await Collection.findByIdAndUpdate(deletedCollection._id, deletedCollection);
        res.status(200).json('Your collection was deleted!');
    } catch (error) {
        return res.status(400).send(error.message);
    }
  }
}

module.exports = new collectionController();
