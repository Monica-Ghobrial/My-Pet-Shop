const UserControllers = require('./Controllers/UserControllers')
const SystemControllers = require('./Controllers/SystemControllers')
const express = require('express')
var router = express.Router();
const mongoose = require("mongoose");

router.post('/AskQuestion',UserControllers.AskQuestion)
router.post('/ReportAD/:id',UserControllers.ReportAD)
router.post('/PostAD',UserControllers.PostAD)
router.post('/CalculateAndReportAD/:id',SystemControllers.CalculateAndReportAD)

//SIGN 
router.post('/signUp',UserControllers.register)

module.exports = router