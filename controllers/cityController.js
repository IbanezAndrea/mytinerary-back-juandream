const City = require("../models/City")

const cityController = {
    addCity: async (req, res) => {
        try {
            let city = await new City(req.body).save()
            res.status("201").json({
                message: "a new city has been added",
                response: city._id,
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "could't add city",
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
                    message: "you get one city",
                    response: city,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "could't find city",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error",
                succes: false,
            })
        }
    },
    getCities: async (req, res)=>{
        const query = req.query
        try {
            let cities = await City.find(query? query:null)
            if (cities) {
                res.status("200").json({
                    message: "you get cities",
                    response: cities,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "could't find cities",
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
                    message: "you update one city",
                    response: putCity,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "could't find city",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error",
                succes: false,
            })
        }
    },
    removeCity: async (req, res) => {
        const { id } = req.params
        try {
            await City.findOneAndDelete({ _id: id })
            res.status("200").json({
                message: "you delete one city",
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error",
                succes: false,
            })
        }
    }
}

module.exports = cityController