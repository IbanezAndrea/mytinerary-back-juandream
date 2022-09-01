const City = require('../models/City')

const cityController = {
    addCity: async (req, res) => {
        try {
            let city = await new City(req.body).save()
            res.status("201").json({
                message: "A new city has been added.",
                response: city._id,
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your city could not be added.",
                succes: false,
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
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "The city could not be found.",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                succes: false,
            })
        }
    },

getCities: async (req, res)=>{
    const query = req.query
    let cities
            if(query.city){
                    let regExp= new RegExp(`^${query.city}`,"i")
                    query.city= regExp
                }
    try {
        cities = await City.find(query? query:null)
        if (cities) {
            res.status("200").json({
                message: "The following cities were found.",
                response: cities,
                succes: true,
            })
        } else {
            res.status("404").json({
                message: "No cities could be found...",
                succes: false,
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
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "Could not find the city.",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                succes: false,
            })
        }
    },
    removeCity: async (req, res) => {
        const { id } = req.params
        try {
            await City.findOneAndDelete({ _id: id })
            res.status("200").json({
                message: "You deleted a city.",
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

module.exports = cityController
