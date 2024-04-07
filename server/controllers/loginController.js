const User = require('../models/User')
const bcrypt = require("bcrypt");

const handleLogin = (req, res) => {
    const {email, pwd} = req.body
    if(!email || !pwd) return res.status(400).json({"error": "email and password fields are required"})

    const foundUser = User.findOne({email: email}).exec()
    if(!foundUser) return res.status(401).json({"error": "user not found"})

    const match = bcrypt.compare(pwd, foundUser.pwd)
    if(match) {
        res.status(200).json({"message": "login successful"})
    }
}

module.exports = {handleLogin}