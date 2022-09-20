const { string } = require('joi')
const mongoose= require ('mongoose')
const itinerarySchema = new mongoose.Schema({
    name: {type: String, required:true},
    user: {type: mongoose.Types.ObjectId,ref:"users", required:true},
    city: {type: mongoose.Types.ObjectId,ref:"cities", required:true},
    price: {type: Number, min:1, max:5, required:true},
    likes: {type: Array},
    tags: {type: Array, required:true},
    duration: {type: Number, required: true },
    description: {type: String }
})
const Itinerary = mongoose.model("itineraries", itinerarySchema)
module.exports = Itinerary