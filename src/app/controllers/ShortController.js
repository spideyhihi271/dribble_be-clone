const Short = require("../models/Short");
const User = require("../models/User");
const firebase = require("firebase/app");
const getCurrentTime = require("../../utils/getCurrentTimes");
const formatData = require("../../utils/formatData");
const filtertData = require("../../utils/filterData");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const firebaseConfig = require("../../config/firebase");

// Khởi tạo firebae
firebase.initializeApp(firebaseConfig);
// Khởi tạo kho lưu
const storage = getStorage();

class ShortController {
  async postNewImage(req, res) {
    try {
      // Quá trình lưu
      const dateTime = getCurrentTime();
      const storageRef = ref(
        storage,
        `files/${req.file.originalname + "  " + dateTime}`
      );
      const metadata = {
        contentType: req.file.mimetype,
      };
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      const downloadURL = await getDownloadURL(snapshot.ref);
      return res.send({
        message: "file uploaded to firebase storage",
        name: req.file.originalname,
        type: req.file.mimetype,
        downloadURL: downloadURL,
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async postNewShort(req, res) {
    try {
      const data = {
        ...req.body,
        idOwner: req.user.id,
        likes: [],
        views: 0,
        report: 0,
        deleted: false,
      };
      const newShort = new Short(data);
      await newShort.save();
      res.status(200).json("Upload new short was successfully! ");
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async likeShortById(req, res) {
      const likeOwner = req.user.id;
      const short = await Short.findOne({ _id: req.params.id });
      let updateShort = short.toObject();
      // Check like
      const isExist = updateShort.likes.includes(likeOwner);
      console.log('Đã tồn tại: ', isExist);
      if(isExist) updateShort.likes = updateShort.likes.filter(item => item != likeOwner);
      else updateShort.likes.push(likeOwner);
      await Short.findByIdAndUpdate({ _id: short._id }, updateShort);
      res.status(200).json({
        message: 'Update like was successfully!'
      });
  }
  async getAllShort(req, res) {
    try {
      const queries = req.query;
      const users = await User.find({});
      const shorts = await Short.find({ deleted: false });
      let data = formatData.mutipleShort(shorts, users, queries);
      data = filtertData.forShort(data, queries);
      res.status(200).json(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async getShortById(req, res) {
    try {
      const users = await User.find({ deleted: false });
      const short = await Short.findOne({ _id: req.params.id });
      let data = formatData.singleShort(short, users);
      // Cập nhật lượng xem
      let updateShort = short.toObject();
      updateShort.views += 1;
      await Short.findByIdAndUpdate({ _id: short._id }, updateShort);
      res.status(200).json(data);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
  async deleteShortById(req, res) {
    try {
      let short = await Short.findById(req.params.id);
      if (req.user.id === short.idOwner) {
        let updateShort = short.toObject();
        updateShort.deleted = true;
        await Short.findByIdAndUpdate({ _id: short._id }, updateShort);
        res.status(200).json("Your short deleted successfully!");
      } else {
        res.status(403).json("You are not owner of this short!");
      }
    } catch (error) {
      return res.status(400).send(error.message);
    }

  }
}

module.exports = new ShortController();
