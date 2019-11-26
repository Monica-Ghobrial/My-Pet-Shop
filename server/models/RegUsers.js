const mongoose= require ('mongoose')
const Schema= mongoose.Schema

const RegUsersSchema = new Schema( {

    firstName: {
        type: String
      //  required: true
    },
    lastName: {
        type: String
       // required: true
    },
    phoneNumber:{
        type: Number 
        //required: true
    },
    address:{
        type: String
        //required: true
    },
    email: {
        type: String
        //required: true
    },
    gender: {
        type: String
    },
  
    photo:{

    },
    userAds: {
        type: [
        {
                adID : {
                    type: Schema.Types.ObjectId, ref: 'Ads',
                }
            }
            ]
        },


     userNotif: {
         type: [
            {
                    textNotif : {
                        type: String
                    }
                }
                ]
            }
})
module.exports= RegUsers=mongoose.model('RegUsers',RegUsersSchema)