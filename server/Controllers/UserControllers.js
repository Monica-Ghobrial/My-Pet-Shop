const Questions = require("./../models/Questions");
const Ads = require("./../models/Ads");
const RegUsers= require("./../models/RegUsers");



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
          //const user = await RegUsers.findByIdAndUpdate(newAD.sellerID, {""})
            res.json({ msg: 'AD creates successfully', data: newAD })
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
            let user = await RegUsers.findById(id)
            
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
              
                    const updatedUser = await RegUsers.findByIdAndUpdate(id, {'password': hashPass})
                    user = await RegUsers.findById(id)
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