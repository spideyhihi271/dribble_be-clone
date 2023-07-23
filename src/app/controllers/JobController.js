const Job = require("../models/Job");
const Address = require("../models/Address");
const CreativeField = require("../models/CreativeField");
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
const { json } = require("body-parser");

// Khởi tạo firebae
firebase.initializeApp(firebaseConfig);
// Khởi tạo kho lưu
const storage = getStorage();
class JobController {
  async uploadImageCom(req, res) {
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
      console.log("File successfully uploaded.");
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
  async postNewJobs(req, res) {
    try {
      let data = req.body;
      // Default Data
      data.idOwner = req.user.id;
      data.applys = [];
      data.reports = [];
      data.deleted = false;
      // Save
      let newData = new Job(data);
      await newData.save();
      res.status(200).json(
        {
          message: "Your jobs was uploaded.",
          _id: newData._id,
        }
      );
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async getAllJobs(req, res) {
    try {
      let jobs = await Job.find({ deleted: false });
      let address = await Address.find({});
      let creativeField = await CreativeField.find({});
      jobs = formatData.mutilpleJob(jobs, address, creativeField);
      jobs = filtertData.forJobs(jobs, req.query);
      res.status(200).json(jobs);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async getJobById(req, res) {
    try {
      let jobs = await Job.find({ _id: req.params.id });
      let address = await Address.find({});
      let creatives = await CreativeField.find({});
      jobs = formatData.mutilpleJob(jobs, address, creatives);
      res.status(200).json(jobs[0]);
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async updateJob(req, res) {
    try {
      let data = req.body;
      let job = await Job.findById(req.params.id);
      job = job.toObject();
      let updateData = Object.assign(job, data);
      // Author
      if (job.idOwner != req.user.id) {
        return res.json(403).json("You are not allow to do that");
      }
      // Update
      await Job.findByIdAndUpdate(req.params.id, updateData);
      res.status(200).json("Update successful");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async applyJobById(req, res) {
    try {
      let job = await Job.findById(req.params.id);
      // Apply
      let isExist = false;
      job.applys.map((apply) => {
        if (apply == req.user.id) isExist = true;
      });
      // Logic Apply
      let updateApplys = job.applys;
      if (isExist) {
        updateApplys = updateApplys.filter((apply) => apply != req.user.id);
      } else {
        updateApplys.push(req.user.id);
      }
      // Update
      job.applys = updateApplys;
      await Job.findByIdAndUpdate(job._id, job);
      res.status(200).json("Update apply successful.");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async reportJobById(req, res) {
    try {
      let job = await Job.findById(req.params.id);
      // Check report
      let isExist = false;
      job.reports.map((report) => {
        if (report == req.user.id) isExist = true;
      });
      // Logic report
      let updateReports = job.reports;
      if (!isExist) updateReports.push(req.user.id);
      // Update report
      job.reports = updateReports;
      if (job.reports.length >= 15) job.deleted = true;
      await Job.findByIdAndUpdate(req.params.id, job);
      res.status(200).json("Report successfully!");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async getJobByOwner(req, res) {
    try {
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
  async deletedJobById(req, res) {
    try {
      let job = await Job.findById(req.params.id);
      // Autho
      if (job.idOwner != req.user.id)
        return res.status(403).json("You are not allow to do that");
      // Deleted
      job = job.toObject();
      job.deleted = true;
      await Job.findByIdAndUpdate(job._id, job);
      res.status(200).json("Your job was deleted!");
    } catch (error) {
      res.status(400).json(error.message);
    }
  }
}

module.exports = new JobController();
