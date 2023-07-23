const express = require("express");
const router = express.Router();
const jobController = require("../app/controllers/JobController");
const tokenMiddleWare = require("../app/middlewares/tokenMiddleWare");
const multer = require("multer");

// Cài đặt nơi lưu trữ tạm thời
const upload = multer({ storage: multer.memoryStorage() });

// POST api/v1/imageCom
router.post(
  "/uploadImageCom",
  upload.single("file"),
  tokenMiddleWare.veryfyToken,
  jobController.uploadImageCom
);
// POST api/v1/job
router.post("/", tokenMiddleWare.veryfyToken, jobController.postNewJobs);
// GET api/v1/job
router.get("/", jobController.getAllJobs);
// GET api/v1/job/:id
router.get("/:id", jobController.getJobById);
// PATCH api/v1/job
router.patch('/update/:id', tokenMiddleWare.veryfyToken, jobController.updateJob);
// PATCH api/v1/job/apply
router.patch('/apply/:id', tokenMiddleWare.veryfyToken, jobController.applyJobById);
// PATCH api/v1/job/report
router.patch('/report/:id', tokenMiddleWare.veryfyToken, jobController.reportJobById);
// DELETED api/v1/job/deleted/:id
router.delete('/delete/:id', tokenMiddleWare.veryfyToken, jobController.deletedJobById);
module.exports = router;
