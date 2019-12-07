const Questions = require("./../models/Questions");
const Ads = require("./../models/Ads");
const User = require("../models/RegUsers")
const passport = require('passport')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const config = require('../../config/keys')
const mail = require('../../config/mail')
const mailer = require('../mailer')
const cloudinary = require('cloudinary').v2

const dotenv = require('dotenv');
dotenv.config()
const tokenKey = process.env.secretOrKey;
const cloud_name =  process.env.cloud_name
const api_key = process.env.api_key
const api_secret = process.env.api_secret


//const {google} = require('googleapis');
//const Photos = require('googlephotos');
//const photos = new Photos();


/*const oauth2Client = new google.auth.OAuth2(
    '112982398056-ven5naj6ihvi152cga0pgi2395hr2n6r.apps.googleusercontent.com',
    'jEg947vbhuzZqhVoKGYiROdq',
    GoogleAuth.signIn()
  );



  const scopes = [
    Photos.Scopes.READ_ONLY
    
  ];

  const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    scope:scopes

  });

  */

let UserControllers = {
    // authentication
    authenticate: passport.authenticate('jwt', { session: false }),

    Login : async (req, res) => {
      try {
        const { email, password } = req.body;
        const log_user = await User.findOne({ email });
        if (!log_user) return res.json({ msg : "Email does not exist" });
        console.log("HERE 1")
  
        if (log_user){
          const match = bcrypt.compareSync(password, log_user.password);
          if (match) {
            if (log_user.active===true){
              const payload = {
                  id: log_user._id,
                  email: log_user.email,
                };
                const token = jwt.sign(payload, tokenKey, { expiresIn: "1000h" });
                console.log("HERE 2")
                return res.status(200).json({msg:"success",data: `Bearer ${token}`})
              }else {
                console.log("HERE 3")
                return res.json({msg:'You need to verify the email that is used in registeration'})
              }
              } else {
                console.log("HERE 4")
                return res.json({ msg: "Wrong password" });
              }
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
          return res.json({ msg:"Failed" , error: 'Email already exists' })
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

      findMyAds: async (req, res)=>{
        try{
          
            const id= req.body.sellerID
            const AD= await Ads.find({sellerID:id}).sort({timePosted: 'descending'})
            if (AD){
              return res.status(200).json({ msg: 'your Ads', data: AD })
            }else{
              return res.status(400).json({ msg: 'Bad request' })
            }
           }

        catch (error) {
              console.log(error)
             }
      },

      findAllAds: async (req, res)=>{
        try{
          
            const AD= await Ads.find().sort({timePosted: 'descending'})
            if (AD){
              return res.status(200).json({ msg: 'your Ads', data: AD })
            }else{
              return res.status(400).json({ msg: 'Bad request' })
            }
           }

        catch (error) {
              console.log(error)
             }
      },

      viewAds: async (req, res)=>{
        try{  
            const id= req.params.adsId
            const AD= await Ads.findById(id)
            if (AD){
              return res.status(200).json({ data: AD })
            }else{
              return res.status(400).json({ msg: 'Bad request' })
            }
          }

         catch (error) {
              console.log(error)
            }
     },

      //Post a new AD
      PostAD: async (req, res)=>{
        try{
          let images = req.body.images
          let img_ids = []
          for (let i=0 ; i<images.length ; i++){
            if (images[i].length > 0){
              cloudinary.config({ 
                cloud_name: 'dtuayyndb', 
                api_key: '219414563696285', 
                api_secret: 'HUtlAgCsbO0egqY2D_Vv3rz3pWE' 
              });
              await cloudinary.uploader.upload(images[i] , {folder: "MyPet",
                overwrite: true,
                invalidate: true,},
              function(error, result) {
                if (result){
                  img_ids.push(result.public_id)
                }
                if (error){
                return res.json({ msg: "Can't upload images correctly" })
                }
              })
            }
          }
          let seller = await User.findById(req.body.sellerID)
          let newBody = Object.assign({},req.body)
          delete newBody.images
          newBody.photos = img_ids
          newBody.seller_phoneNumber = seller.phoneNumber
          newBody.seller_email = seller.email
          console.log(newBody)
          const newAD = await Ads.create(newBody)
          return res.json({ msg: "Your ads is published now" , data:newAD.id})   
           }

        catch (error) {
              console.log(error)
            }
    },

    editAds: async (req,res)=>{
      try{
        const id = req.params.adsId
        const updated = await Ads.findByIdAndUpdate(id, req.body)
        return res.status(200).json({msg:"Updated Successfully"})
      }catch(e){

      }
    },
    deleteAds: async (req,res)=>{
      try{
        const id = req.params.adsId
        console.log(id)
        const deleted = await Ads.findByIdAndRemove(id)
        return res.status(200).json({msg:"Deleted !"})
      }catch(e){

      }
    },
    upload: async (req, res)=>{
      try{
        let link=req.body.data
        cloudinary.config({ 
        cloud_name:cloud_name, 
        api_key: api_key,
        api_secret: api_secret 
      });
      cloudinary.uploader.upload(link , {folder: "MyPet",
        overwrite: true,
        invalidate: true,},
      function(error, result) {console.log(error,result.public_id)})
      res.json({ msg: 'Uploaded' })
       }

      catch (error) {
            console.log(error)
          }
  },
/*
    uploadPhotos: async(req, res) =>{
        try{
            const {tokens} = await oauth2Client.getToken();
            const response = await photos.mediaItems.get(mediaItemId);
            res,json({msg:'photo isssss', response});
        }
        catch(error){
            console.log(error)
        }
    },

*/
    changePassword: async function (req, res) {
        try {
            const id = req.params.id
            const oldPassword = req.body.oldPassword
            const newPassword = req.body.newPassword
            let user = await User.findById(id)
            
            if (!user) {
                return res.status(404).json({ error: 'Cannot find an admin account with this ID' })
            }
            else {
                
            const match = bcrypt.compareSync(oldPassword, user.password);
                if (!match) {
                    return res.status(403).json({ error: 'Incorrect old password' })
                }
                else {
                    const salt = bcrypt.genSaltSync(10); 
                    const hashPass = bcrypt.hashSync(newPassword, salt); // hashing the password which is already saved in tempUser before saved in investor table
              
                    const updatedUser = await 
                    s.findByIdAndUpdate(id, {'password': hashPass})
                    user = await User.findById(id)
                    return res.status(200).json({ msg: 'The password was updated', data: user })
                }
            }
        }
        catch (error) {
            console.log(error)
            return res.status(400).json({ error: 'Error processing query.' })
        }

    }

};
module.exports = UserControllers;