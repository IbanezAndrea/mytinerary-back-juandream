const mongoose= require ('mongoose')
const itinerarySchema = new mongoose.Schema({
    name: {type: String, required:true},
    user: {type: String, required:true},
    city: {type: String, required:true},
    price: {type: Number, required:true},
    likes: {type: Array, required:true},
    tags: {type: Array, required:true},
    duration: {type: Number, required: true },
})
const Itinerary = mongoose.model("itineraries", itinerarySchema)
module.exports = Itinerary