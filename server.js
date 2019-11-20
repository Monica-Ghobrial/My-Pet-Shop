const express = require('express')
const mongoose = require('mongoose')
const Ads = require('./server/api/ads')

const app = express()

const db = require('./config/keys').mongoURI

mongoose.connect(db)
    .then(()=>console.log("Mongoose is connected xD ..."))
    .catch(err=>console.log(err));

app.use('/api/ads',Ads)

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server is run on port ${port}`))