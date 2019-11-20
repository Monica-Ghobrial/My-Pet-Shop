const mongoose= require ('mongoose')
const Schema= mongoose.Schema

const QuestionsSchema = new Schema( {

    senderID:{
        type: Schema.Types.ObjectId, ref: 'RegUsers',
       // type:Number,
       // require: false
    },

    responderID: {
        type: Schema.Types.ObjectId, ref: 'RegUsers',
        //type:Number,
      //  require: true 
    },
    questionText : {
        type: String,
        require:true
    },

    answerText :{
        type:String
     //   require:true
    },
    time :{
        type:Date
       // require:true
        } 
    })
module.exports= Questions=mongoose.model('Questions',QuestionsSchema)