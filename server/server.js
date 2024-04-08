const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const verifyJWT = require('./middlewares/verifyJWT')
const app = express()

connectDB()

app.use(cors(corsOptions));


app.use(express.json())

app.use(express.urlencoded({extended: false}))


app.use(cookieParser())


//routes
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))

//this has to be a protected route. because we need to verify the accessToken so we clear it from local storage
app.use(verifyJWT)
app.use('/logout', require('./routes/logout'))

mongoose.connection.once('open', () => {
    console.log('database connected')
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
})
