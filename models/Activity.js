const mongoose= require ('mongoose')
const ActivitySchema = new mongoose.Schema({
    name: {type: String, required:true},
    photo: {type: String, required:true},
    itinerary: {type: mongoose.Types.ObjectId, ref:'itineraries' ,required:true},
})
const Activity = mongoose.model("activities", ActivitySchema)
module.exports = Activity