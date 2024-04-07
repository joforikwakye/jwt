const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleCreateNewUser = async (req, res) => {
  const { user, email, pwd } = req.body;
  if (!user || !email || !pwd) return res.status(400).json({
      error: "username, email and password fields are required",
    });

  //checking for duplicate
  const foundUser = await User.findOne({user: user }).exec();
  console.log(foundUser)
  if (foundUser) return res.sendStatus(409)

  try {
    //hash user password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    //create new user
    const newUser = await User.create({
      username: user,
      email: email,
      password: hashedPwd,
    });

    console.log(newUser);
    res.status(200).json({ success: `User ${user} has been created` });
  } catch (err) {
    res.status(500).json({err})
  }
};

module.exports = { handleCreateNewUser };
