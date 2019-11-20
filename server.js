const express = require('express')
const mongoose = require('mongoose')

const app = express()

const db = require('./config/keys').mongoURI

mongoose.connect(db)
    .then(()=>console.log("Mongoose is connected xD ..."))
    .catch(err=>console.log(err));

const port = process.env.PORT || 3000;

app.listen(port,()=>console.log(`Server is run on port ${port}`))