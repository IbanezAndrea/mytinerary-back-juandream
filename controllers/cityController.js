const City = require('../models/City')

const cityController = {
    addCity: async (req, res) => {
        try {
            let city = await new City(req.body).save()
            res.status("201").json({
                message: "A new city has been added.",
                response: city._id,
                success: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your city could not be added.",
                success: false,
            })
        }
    },
    getOneCity: async (req, res) => {
        const { id } = req.params
        try {
            let city = await City.findOne({ _id: id })
            if (city) {
                res.status("200").json({
                    message: "Found a city.",
                    response: city,
                    success: true,
                })
            } else {
                res.status("404").json({
                    message: "The city could not be found.",
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

getCities: async (req, res)=>{
    const query = {}
    let cities
    if(req.query.city){
        let regExp= new RegExp(`^${req.query.city}`,"i")
        query.city= regExp
    }
    try {
        cities = await City.find(query)
        if (cities) {
            res.status("200").json({
                message: "The following cities were found.",
                response: cities,
                success: true,
            })
        } else {
            res.status("404").json({
                message: "No cities could be found...",
                success: false,
            })
        }
    } catch (error) {
        console.log(error)
    }
},

    modifyCity: async (req, res)=>{
        const { id } = req.params
        let putCity = {}
        try {
            putCity = await City.findOneAndUpdate({_id:id},req.body,{new:true})
            if (putCity) {
                res.status("200").json({
                    message: "You have updated acity.",
                    response: putCity,
                    success: true,
                })
            } else {
                res.status("404").json({
                    message: "Could not find the city.",
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
    removeCity: async (req, res) => {
        const { id } = req.params
        try {
            await City.findOneAndDelete({ _id: id })
            res.status("200").json({
                message: "You deleted a city.",
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

module.exports = cityController
