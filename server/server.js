const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const app = express()

connectDB()

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(cors(corsOptions))

app.use(cookieParser())


//routes
app.use('/register', require('./routes/register'))
app.use('/login', require('./routes/login'))
app.use('/logout', require('./routes/logout'))

mongoose.connection.once('open', () => {
    console.log('database connected')
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
})
