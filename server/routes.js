const UserControllers = require('./Controllers/UserControllers')
const SystemControllers = require('./Controllers/SystemControllers')
const express = require('express')
var router = express.Router();
const mongoose = require("mongoose");

router.post('/AskQuestion',UserControllers.AskQuestion)
router.post('/ReportAD/:id',UserControllers.ReportAD)
router.post('/PostAD',UserControllers.PostAD)
router.post('/CalculateAndReportAD/:id',SystemControllers.CalculateAndReportAD)

//router.get('/ViewAllADs',UserControllers. ViewAllADs)
//router.get('/UploadPhoto', UserControllers.uploadPhotos)
router.put('/ChangePassword/:id', UserControllers.changePassword)


//SIGN 
router.post('/signUp',UserControllers.register)
router.post('/signIn',UserControllers.Login)
router.get('/verify/:token',UserControllers.verify)

router.post('/upload',UserControllers.upload)

router.post('/postAds',UserControllers.PostAD)
router.post('/findmyads',UserControllers.findMyAds)
router.get('/viewAds/:adsId',UserControllers.viewAds)
router.get('/findAllAds',UserControllers.findAllAds)

router.delete('/deleteAds/:adsId',UserControllers.deleteAds)
router.put('/editAds/:adsId',UserControllers.editAds)



module.exports = router