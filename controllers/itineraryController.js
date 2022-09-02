const Itinerary = require("../models/Itinerary")

const itineraryController = {
    addItinerary: async (req, res) => {
        try {
            const itinerary = new Itinerary(req.body).save()
            res.status(201).json({
                message: "A new itinerary has been added.",
                response: itinerary._id,
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Your itinerary could not be added.",
                succes: false,
            })
        }
    }
}

module.exports = itineraryController