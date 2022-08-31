const { name } = require('ejs')
const { query } = require('express')
const { db } = require('../models/City')
const City = require('../models/City')

const cityController = {
    addCity: async (req, res) => {
        try {
            let city = await new City(req.body).save()
            res.status("201").json({
                message: "A new city has been added",
                response: city._id,
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your city could not be added",
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
                    message: "Found a city",
                    response: city,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "The city could not be found",
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
        //let query = {}
        let cities
        let {city} = req.query
        let regExp= new RegExp(`^${city}`)
        console.log(regExp)
        try {
            let cities= await City.find({city: regExp}).exec();
            if (res.query == true) {
                res.status("200").json({
                    message: "The following cities were found",
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
                    message: "You have updated acity",
                    response: putCity,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "Could not find the city",
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
                message: "You deleted a city",
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