const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

const dbConnection = require("./config/dbConfig.js");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
dbConnection();
const userRoutes = require("./routes/userRoutes.js");
const placesRoutes = require("./routes/placeRoute.js");
app.use("/", userRoutes);
app.use("/", placesRoutes);
app.get("/test", (req, res) => {
  res.status(200).send({
    message: "Hello World",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
