const Questions = require("./../models/Questions");
const Ads = require("./../models/Ads");


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
            res.json({ msg: 'AD creates successfully', data: newAD })
           }

        catch (error) {
              console.log(error)
             }
    },

    

};
module.exports = UserControllers;