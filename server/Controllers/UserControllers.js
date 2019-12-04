const Questions = require("./../models/Questions");
const Ads = require("./../models/Ads");
const User = require("../models/RegUsers")
const passport = require('passport')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const config = require('../../config/keys')
const mail = require('../../config/mail')
const tokenKey = config.secretOrKey;
const mailer = require('../mailer')


let UserControllers = {
    // authentication
    authenticate: passport.authenticate('jwt', { session: false }),

    Login : async (req, res) => {
      try {
        const { email, password } = req.body;
        const log_user = await User.findOne({ email });
        if (!log_user) return res.status(400).json({ error : "Email does not exist" });
  
        if (log_user){
          const match = bcrypt.compareSync(password, log_user.password);
          if (match) {
            if (log_user.active===true){
              const payload = {
                  id: log_user._id,
                  email: log_user.email,
                };
                const token = jwt.sign(payload, tokenKey, { expiresIn: "1000h" });
                return res.json({data: `Bearer ${token}`})
              }else {
                return res.json({data:'You need to verify the email that is used in registeration'})
              }
              }else return res.status(400).send({ error: "Wrong password" });
        }        
  
      } 
      catch (e) {
          console.log(e)
      }
    },
    register : async (req, res) => {

      const {       
        firstName,
        lastName,
        phoneNumber,
        address,
        email,
        password,
        gender,
       } = req.body
      console.log(55,"HERE")
      const oldUser = await User.findOne({ email })
      if (oldUser)
      {
          console.log('Email Exists')
          return res.status(400).json({ error: 'Email already exists' })
      }
      else{
        const payload = {
          email: email,
        };
        const token = jwt.sign(payload, tokenKey, { expiresIn: "1000h" });
        const salt = bcrypt.genSaltSync(10);
        console.log(69,token)
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({
                firstName,
                lastName,
                phoneNumber,
                address,
                email,
                password:hashPass,
                gender,
                active : false,
                secret : token
              })
              console.log(newUser)
              res.json({ msg: 'Register succefully , Please open your email and follow the steps to activate your account', data: newUser })
              console.log("haha")
              try{
                const html = 'Hi there, <br/> Thank you for registering <br/><br/> Please verify your email by clicking on the following page:<a href= "http://localhost:3000/verify/'+newUser.secret+'">Click here to verify</a></br></br> '
                console.log(email)
                await mailer.sendEmail(mail.user, email, 'Please verify your email', html)
              }catch(e){
                console.log(e)
              }             
      }
  },

    verify: async (req,res) => {
        try{
            console.log(req.params.token)
            const user = await User.findOne({"secret":req.params.token})
            const update = await User.findByIdAndUpdate( user._id,{"active" :true})
        }
        catch(error){
            res.json({message:'error'})
        }
    },

    //ask question (to specific user ??)
    AskQuestion:async (req, res) => {
        try {
           
          const newQuestion = await Questions.create(req.body)
          const createdQuestion = await Questions.findByIdAndUpdate(newQuestion.id,{"time":new Date()})
          res.json({ msg: 'Question created successfully', data: newQuestion })
         }
      catch (error) {
          console.log(error)
         }
      },

//report an AD, missing incrementing views
      ReportAD: async (req, res)=>{
          try{
            
              const id= req.params.id
              const AD= await Ads.findById(id)
              const updateAD = await Ads.findByIdAndUpdate(id, {"views": AD.views+1})
              

              res.json({ msg: 'AD updated successfully', data: AD })
             }

          catch (error) {
                console.log(error)
               }
      },

      //Post a new AD
      PostAD: async (req, res)=>{
        try{
            
          console.log("arrived")
          const newAD = await Ads.create(req.body)
          const createdAD = await Ads.findByIdAndUpdate(newAD.id,{"timePosteds":new Date()})
            res.json({ msg: 'AD creates successfully', data: newAD })
           }

        catch (error) {
              console.log(error)
             }
    },

    

};
module.exports = UserControllers;