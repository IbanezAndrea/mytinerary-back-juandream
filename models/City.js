const mongoose= require ('mongoose')
const citySchema = new mongoose.Schema({
    city: {type: String, required:true},
    country: {type: String, required:true},
    photo: {type: String, required:true},
    population: {type: Number, required:true},
    fundation: { type: Number, required: true },
    description: {type:String},
})
const City = mongoose.model("city", citySchema)
modules.exports = City