const Ads = require("./../models/Ads");


let SystemControllers = {

//system calculates reports and deletes Ad
CalculateAndReportAD: async (req, res)=>{
    try{
      console.log("arrived")
      const id= req.params.id
      const AD = await Ads.findById(id)
      //const updateAD =null
      if(AD.views >= 3)
      console.log("arrived2")
          var updatedAD = await Ads.findByIdAndUpdate (id, {"reported":true})
       }

    catch (error) {
          console.log(error)
         }
},

}
module.exports = SystemControllers;