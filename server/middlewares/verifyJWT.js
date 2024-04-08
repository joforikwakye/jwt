const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || request.headers.Authorization;
  if (!authHeader) {
    console.error("Unauthorized");
    return res.sendStatus(401)
  }; 

  const accessToken = authHeader.split(" ")[1];
  //console.log("access token:", accessToken);

  jwt.verify(accessToken, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      console.error("jwt error:", err);
      return res.status(403).json({ error: "Forbidden" }); 
    }

    if (!decoded || !decoded.email) {
      console.error("invalid:", decoded);
      return res.status(403).json({ error: "Forbidden" });
    }

    
    req.email = decoded.email;
    next(); 
  });
};

module.exports = verifyJWT;
