const mongoose= require ('mongoose')
const citySchema = new mongoose.Schema({
    city: {type: String, required:true},
    country: {type: String, required:true},
    photo: {type: String, required:true},
    population: {type: Number, min:1000, max:10000000, required:true},
    fundation: {type: Date, required: true },
    description: {type:String},
})
const City = mongoose.model("city", citySchema)
module.exports = City