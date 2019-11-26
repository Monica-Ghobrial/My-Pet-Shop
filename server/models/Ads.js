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

    description: {
        type:String
       // required: true 
    },
     
    photo:{
       
    },

    city:{
        type:String
       // required: true
    },

    price:{
        type:Number
       // required: true
    },
     category:{
        type:String
       // required: true
     },

     contactBy:{
        type:String
       // required: true
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
        required: true
     }

})

module.exports= Ads=mongoose.model('Ads',AdsSchema)