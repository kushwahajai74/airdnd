const catchAsyncErros = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuth = catchAsyncErros(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw next(Error("Please login to access this resource"));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);
  next();
});
