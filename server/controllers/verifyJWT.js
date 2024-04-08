const jwt = require("jsonwebtoken");


const handleVerifyJWT = (req, res) => {
  const authHeader = req.headers.authorization || request.headers.Authorization;
  if (!authHeader) return res.sendStatus(401); //unauthorized

  const accessToken = authHeader.split(" ")[1];

  jwt.verify(  
    accessToken,
    process.env.ACCESS_SECRET_TOKEN,
    (err, decoded) => {
        if(err) return res.sendStatus(403)//forbidden
        req.email = decoded.email
        res.json({authorized: true})
    }
  );
};

module.exports = {handleVerifyJWT}
