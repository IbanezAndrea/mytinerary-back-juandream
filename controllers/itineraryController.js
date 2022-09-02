const Itinerary = require("../models/Itinerary")

const itineraryController = {
    addItinerary: async (req, res) => {
        try {
            let itinerary = await new Itinerary(req.body).save()
            res.status("201").json({
                message: "A new itinerary has been added.",
                response: itinerary._id,
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your itinerary could not be added.",
                succes: false,
            })
        }
    },
    getItineraries: async (req, res) => {
        let itineraries
        try {
            itineraries = await Itinerary.find()
            if (itineraries) {
                res.status("200").json({
                    message: "The following itineraries were found.",
                    response: itineraries,
                    succes: true,
            })
            } else {
                res.status("404").json({
                    message: "No itineraries could be found...",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your itinerary could not be added.",
                succes: false,
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
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "Could not find the itinerary.",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your itinerary could not be found.",
                succes: false,
            })
        }
    },
    removeItinerary: async (req, res) => {
        const { id } = req.params
        try {
            await Itinerary.findOneAndRemove({ _id: id })
            res.status("200").json({
                message: "You deleted a itinerary.",
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                succes: false,
            })
        }
    }
}

module.exports = itineraryController