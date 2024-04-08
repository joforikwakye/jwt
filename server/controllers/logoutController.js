const jwt = require("jsonwebtoken");


//1.where in the browser do i check that the access token has been cleared from storage?
//2. and what happens to the refresh token stored in the db after logout?
//3. want to automatically display a message that session expired when verifyJWT is invalidated
//4. how do i use the application and network things tab in chrome.

//so the backend here would invalidate the refeshtoken from the db?
//then we need to find a way to get the refreshtoken from the set cookie or

const handleLogout = async (req, res) => {
  // Extract the JWT token from the Authorization header
  const authHeader = req.headers.authorization;
  if(!authHeader) return res.sendStatus(401)

  const token = authHeader.split(" ")[1];

  // Verify and decode the JWT token
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
    if (err) {
      return res.sendStatus(401); 
    }


    return res.status(200).json({ message: "user logged out" });
  });
};

module.exports = { handleLogout };
