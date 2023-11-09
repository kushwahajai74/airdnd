const express = require("express");
const {
  registerUser,
  loginUser,
  profile,
  logout,
  uploadByLink,
  uploadPhoto,
  places,
} = require("../controllers/userController");
const { isAuth } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(isAuth, profile);
router.route("/logout").post(logout);
router.route("/upload-by-link").post(uploadByLink);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.route("/upload").post(upload.array("photos", 100), uploadPhoto);

module.exports = router;
