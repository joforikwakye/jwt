const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const Student = require("./models/student");
const cookieParser = require("cookie-parser");


const app = express();
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


mongoose
  .connect("mongodb://127.0.0.1:27017/school")
  .then(() => {
    console.log("server started");
  })
  .catch((err) => console.log(err));



app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  Student.create({ name, email, password })
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  Student.findOne({ email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          const accessToken = jwt.sign({  email },"jwt-access-token-secret-key",{ expiresIn: "1m" });
          const refreshToken = jwt.sign({ email: email },"jwt-refresh-token-secret-key", {expiresIn: "5m" });

          res.cookie("accessToken", accessToken, { maxAge: 60000 });

          res.cookie("refreshToken", refreshToken, {maxAge: 300000,httpOnly: true,secure: true,sameSite: "strict",});
          return res.json({ Login: true });
        }
      } else {
        res.json({ Login: false, Message: "no record" });
      }
    })
    .catch((err) => res.json(err));
});

//middleware checking the existence of token
const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.json({ valid: false, message: "No Access Token" });
  }

  jwt.verify(accessToken, "jwt-access-token-secret-key", (err, decoded) => {
    if (err) {
      // Check if the error is due to token expiration (e.g., "jwt expired")
      if (err.message.includes("expired")) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
          return res.json({ valid: false, message: "No Refresh Token" });
        }
        // Attempt to renew token using renewToken
        if (renewToken(req, res)) {
          next();
        }
      } else {
        return res.json({ valid: false, message: "Invalid Token" });
      }
    } else {
      req.email = decoded.email;
      next();
    }
  });
};

const renewToken = (req, res) => {
  const refreshtoken = req.cookies.refreshToken;
  let exist = false;
  if (!refreshtoken) {
    return res.json({ valid: false, message: "No Refresh token" });
  } else {
    jwt.verify(refreshtoken, "jwt-refresh-token-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Refresh Token" });
      } else {
        const accessToken = jwt.sign(
          { email: decoded.email },
          "jwt-access-token-secret-key",
          { expiresIn: "1m" }
        );
        res.cookie("accessToken", accessToken, { maxAge: 60000 });
        exist = true;
      }
    });
  }
  return exist;
};


app.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ valid: true, message: "authorized" });
});

app.listen(3000, () => {
  console.log("started on port 3000");
});


