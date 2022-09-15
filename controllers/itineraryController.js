const Itinerary = require("../models/Itinerary")
const joi = require('joi')
const { JSONCookie } = require("cookie-parser")

const validator = joi.object({
    name: 
        joi.string()
        .min(3)
        .max(50)
        .required(),
    user: 
        joi.string()
        .hex()
        .required(),
    city: 
        joi.string()
        .hex()
        .required(),
    price: 
        joi.number()
        .integer()
        .min(1)
        .max(5)
        .required() ,
    likes:
        joi.array()
        .unique((a, b) => a.property === b.property)
        .required(),
    tags: 
        joi.string()
        .required() ,
    duration: 
        joi.number()
        .min(1)
        .max(200)
        .integer()
        .required() ,
    description: 
        joi.string()
        .min(15)
        .max(500),

})

const itineraryController = {
    addItinerary: async (req, res) => {
        try {
            let result = await validator.validateAsync(req.body)
            let itinerary = await new Itinerary(result).save()
            res.status("201").json({
                message: "A new itinerary has been added.",
                response: itinerary._id,
                success: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your itinerary could not be added.",
                success: false,
            })
        }
    },
    getItinerary: async (req, res) => {
        const { id } = req.params
        try {
            let itinerary = await Itinerary.findOne({ _id: id })
            if (itinerary) {
                res.status("200").json({
                    message: "Found itinerary✔",
                    response: itinerary,
                    success: true,
                })
            } else {
                res.status("404").json({
                    message: "Could not be found ❌",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                success: false,
            })
        }
    },
    getItineraries: async (req, res) => {
        let itineraries
        let query = {}
        if(req.query.city){
            query.city = req.query.city
        }
        if (req.query.auth) {
            query.user = req.query.auth
        }
        try {
            itineraries = await Itinerary.find(query)
            .populate("user",{name:1, photo:1,country:1})
            .populate("city",{city:1})
            if (itineraries) {
                res.status("200").json({
                    message: "The following itineraries were found.",
                    response: itineraries,
                    success: true,
            })
            } else {
                res.status("404").json({
                    message: "No itineraries could be found...",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your itinerary could not be added.",
                success: false,
            })
        }
    },
    modifyItinerary: async (req, res) => {
        const { id } = req.params
        let itinerary
        try {
            itinerary = await Itinerary.findOneAndUpdate({ _id: id }, req.body, { new: true })
            if (itinerary) {
                res.status("200").json({
                    message: "You have updated an itinerary.",
                    response: itinerary,
                    success: true,
                })
            } else {
                res.status("404").json({
                    message: "Could not find the itinerary.",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your itinerary could not be found.",
                success: false,
            })
        }
    },
    removeItinerary: async (req, res) => {
        const { id } = req.params
        try {
            await Itinerary.findOneAndRemove({ _id: id })
            res.status("200").json({
                message: "You deleted a itinerary.",
                success: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                success: false,
            })
        }
    }
}

module.exports = itineraryController
