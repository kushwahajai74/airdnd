const express = require("express");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();

const multer = require("multer");
const { uploadPhoto } = require("../controllers/userController");
const { places, placesInfo } = require("../controllers/placesController");
const upload = multer({ dest: "uploads/" });

router.route("/upload").post(upload.array("photos", 100), uploadPhoto);
router.route("/places").post(isAuth, places);
router.route("/places").get(isAuth, placesInfo);

module.exports = router;
