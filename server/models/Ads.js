const mongoose= require ('mongoose')
const Schema= mongoose.Schema

const AdsSchema = new Schema ({

    sellerID:{
        type: Schema.Types.ObjectId, ref: 'RegUsers',
      
    },
   
    title :{
        type:String
       // required: true
    },

    mainCategory: {
        type:String
       // required: true 
    },

    specificCategory: {
        type:String
       // required: true 
    },

    description: {
        type:String
       // required: true 
    },

    adsLocation: {
        type:String
       // required: true 
    },

    price: {
        type: Number
       // required: true 
    },

    negotiable: {
        type:Boolean
       // required: true 
    },

    photos:{
        type: [
            {
               type: String   
                }
            ] 
    },

    reported :{
        type:Boolean
       // required: true
     },
    views:{
         type:Number
     },

    timePosted :{
        type:Date,
        required: true,
        default:Date.now
     }

})

module.exports= Ads=mongoose.model('Ads',AdsSchema)