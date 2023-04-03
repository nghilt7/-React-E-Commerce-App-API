const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET_KEY
    ).toString(),
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// LOGIN
// REGISTER
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      res.status(401).json("Wrong credentials!");
      return;
    }

    const bytes = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET_KEY
    );
    const password = bytes.toString(CryptoJS.enc.Utf8);

    if (password !== req.body.password) {
      res.status(401).json("Wrong credentials!");
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
