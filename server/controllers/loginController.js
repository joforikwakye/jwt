const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "email and password are required." });
  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    res.status(200).json({ message: "login succesful" });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
