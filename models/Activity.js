const mongoose= require ('mongoose')
const ActivitySchema = new mongoose.Schema({
    name: {type: String, required:true},
    photo: {type: String, required:true},
    itinerary: {type: String},
})
const Activity = mongoose.model("activity", ActivitySchema)
module.exports = Activity