const express = require("express");
const router = express.Router();

// Routers
const userRoute = require("./users");
const shortRoute = require("./shorts");
const commentRoute = require("./comments");
const collectionRoute = require("./collections");
const tagRoute = require("./tags");
const jobRoute = require("./jobs");
const hireRoute = require("./hire");
const addressRoute = require("./address");
const creativeFieldRoute = require("./creativeField");

router.use("/user", userRoute);
router.use("/short", shortRoute);
router.use("/comment", commentRoute);
router.use("/collection", collectionRoute);
router.use("/tag", tagRoute);
router.use("/job", jobRoute);
router.use("/hire", hireRoute);
router.use("/address", addressRoute);
router.use("/creative", creativeFieldRoute);

module.exports = router;
