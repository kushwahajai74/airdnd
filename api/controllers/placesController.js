const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Place = require("../models/Places");

exports.places = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  const placeDoc = await Place.create({
    owner: req.user.id,
    title,
    address,
    photos: addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  });
  return res.json(placeDoc);
});
exports.placesInfo = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.user;
  const placesInfo = await Place.find({ owner: id });
  return res.json(placesInfo);
});
