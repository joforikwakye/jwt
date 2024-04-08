const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User')

const handleRefreshToken =async (req, res) => {
    const cookies  = req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt
    const foundUser = await User.findOne({refreshToken}).exec()
    
    jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_TOKEN,
        (err, decoded) => {
            if(err || foundUser.email !== decoded.email) return res.sendStatus(403)
            
            const accessToken = jwt.sign(
                {email: foundUser.email},
                process.env.ACCESS_SECRET_TOKEN,
                {expiresIn: "30s"}
            )

            res.json({accessToken})
        }
    )

}

module.exports = {handleRefreshToken}