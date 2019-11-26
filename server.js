const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Ads = require('./server/api/ads')
const Questions = require('./server/api/questions')
const User = require('./server/api/regUser')

const UserContollers = require('./server/Controllers/UserControllers')
const routes = require('./server/routes.js')


const app = express()

app.use(bodyParser.json())


const db = require('./config/keys').mongoURI

mongoose.connect(db)
    .then(()=>console.log("Mongoose is connected xD ..."))
    .catch(err=>console.log(err));

app.use('/api/ads',Ads)
app.use('/api/questions',Questions)
app.use('/api/user',User)
app.use('/', routes)

const port = process.env.PORT || 5000;

app.listen(port,()=>console.log(`Server is run on port ${port}`))