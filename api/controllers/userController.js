const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "sdadsfdffJKFKDFKJSDHFJDskfjdskf";
const download = require("image-downloader");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");
const path = require("path");
const fs = require("fs");

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password, 10),
  });
  res.status(200).send({
    success: true,
    user,
  });
});
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  //option for cookie
  const options = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure: process.env.NODE_ENV === "Development" ? false : true,
  };

  //function start
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      jwt.sign(
        { email: user.email, id: user._id },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.status(200).cookie("token", token, options).json({
            user,
            success: true,
          });
        }
      );
    } else {
      res.status(400).json({
        success: false,
        message: "Not found",
      });
    }
  }
});

exports.profile = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
      if (err) throw err;

      const userData = await User.findById(decoded.id);
      res.status(200).json({ userData });
    });
  }
});
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", "").json(true);
});
exports.uploadByLink = catchAsyncErrors(async (req, res, next) => {
  const { link } = req.body;
  // console.log(link)
  const newName = "photo" + Date.now() + ".jpg";
  options = {
    url: link,
    dest: path.join(__dirname, "..", "uploads", newName), // will be saved to /path/to/dest/photo.jpg
  };

  download
    .image(options)
    .then(({ filename }) => {
      console.log("Saved to", filename); // saved to /path/to/dest/photo.jpg
    })
    .catch((err) => console.error(err));
  res.json(newName);
});

exports.uploadPhoto = catchAsyncErrors(async (req, res, next) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { originalname, path } = req.files[i];
    const part = originalname.split(".");
    const ext = part[part.length - 1];
    const newPath = path + "." + ext;

    fs.rename(path, newPath, function (err) {
      if (err) throw err;
      console.log("File Renamed!");
    });
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  return res.json(uploadedFiles);
});
