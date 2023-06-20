const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/item");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successful"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
require("./middleware/passport")(passport);

app.use("/users", authRoutes);
app.use("/items", itemRoutes);

app.listen(5000, () => console.log("Server started on port 5000"));
