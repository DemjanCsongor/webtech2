const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ username: req.body.username });
  if (candidate) {
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidate.password
    );
    if (passwordResult) {
      const token = jwt.sign(
        {
          username: candidate.username,
          userId: candidate._id,
        },
        "secret",
        { expiresIn: 60 * 60 }
      );
      res.status(200).json({ token: `Bearer ${token}` });
    } else {
      res.status(401).json({ message: "Passwords do not match" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports.register = async function (req, res) {
  const candidate = await User.findOne({ username: req.body.username });
  if (candidate) {
    res.status(409).json({ message: "This username is already taken" });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      fullName: req.body.fullName,
      birthDate: req.body.birthDate,
      location: req.body.location,
      username: req.body.username,
      password: bcrypt.hashSync(password, salt),
    });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Error occurred while registering the user." });
    }
  }
};
