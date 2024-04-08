const User = require("../models/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  //res.json({ message: "from logout backend" });
  if (!cookies?.jwt) return res.sendStatus(204);

  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({ refreshToken }).exec();

  foundUser.refreshToken = "";
  const result = foundUser.save();
  res.json(result);

  res.clearCookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.sendStatus(204);
};

module.exports = {handleLogout}
