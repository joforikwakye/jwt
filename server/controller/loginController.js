const Student = require("../models/student");
const jwt = require('jsonwebtoken')


const handleLogin = (req, res) => {
    const { email, password } = req.body;
    if(!email || !password) return res.sendStatus(400).json({"message": "email and password are required"})
    Student.findOne({ email })
      .then((user) => {
        if (user) {
          if (user.password === password) {
            const accessToken = jwt.sign(
              {email: user.email},
              process.env.ACCESS_SECRET_TOKEN,
              {expiresIn: '30s'}
            )
            const refreshToken = jwt.sign(
              {email: user.email},
              process.env.ACCESS_REFRESH_TOKEN,
              {expiresIn: '1d'}
            )

            res.json({accessToken})
            
            
          }
        } else {
          res.json({ Login: false, Message: "no record" });
        }
      })
      .catch((err) => res.json(err));
}

module.exports = {handleLogin}