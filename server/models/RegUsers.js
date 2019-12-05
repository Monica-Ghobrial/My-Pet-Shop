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

    password: {
        type: String
    },


    gender: {
        type: String
    },

    active:{
        type:Boolean
    },

    secret:{
        type:String
    },

     userNotif: {
         type: [{
                type: String    
         }]
            }
})
module.exports= RegUsers=mongoose.model('RegUsers',RegUsersSchema)