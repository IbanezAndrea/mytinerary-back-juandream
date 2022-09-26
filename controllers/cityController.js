const City = require('../models/City')
const joi = require("joi")
const validator = joi.object({
    city: joi.string().required(),
    country: joi.string().insensitive().required(),
    photo: joi.string().uri().required(),
    population: joi.number().integer().min(1000).max(1000000000).required(),
    foundation: joi.date().max(new Date()).required(),
    description: joi.string()
})
const cityController = {
    addCity: async (req, res) => {
        try {
            let {
                city,
                country,
                photo,
                population,
                foundation,
                description
            } = req.body
            let result = await validator.validateAsync(req.body)

            if (req.user.role  === "admin" ){
                city = await new City(result).save()
                res.status("201").json({
                    message: "A new city has been added.",
                    response: city._id,
                    success: true,
                })
            }else{
                res.status("401").json({
                    message: "Unauthorized",
                    success: true,
                })
            }
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
    if (req.query.country && req.query.country !== "none" ) {
       let regExp2 = new RegExp(`^${req.query.country}`,"i")
        query.country = regExp2
        }
    let order = req.query.order
    try {
        cities = await City.find(query)
        if (cities) {
            switch (order) {
                case "a-z":
                    cities.sort((a, b) => a.city.localeCompare(b.city))
                    break;
                case "z-a":
                    cities.sort((a, b) => b.city.localeCompare(a.city))
                    break;
                case "up":
                    cities.sort((a, b) => a.population - b.population)
                    break;
                case "down":
                    cities.sort((a, b) => b.population - a.population)
                    break;
                case "old":
                    cities.sort((a, b) => {
                        let resultSort = new Date(a.foundation).getTime() - new Date(b.foundation).getTime()
                        return resultSort
                    })
                    break;
                case "new":
                    cities.sort((a, b) => {
                        let resultSort = new Date(b.foundation).getTime() - new Date(a.foundation).getTime()
                        return resultSort
                    })
                    break;
                default:
                    break;
            }
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
        const {role} = req.user
        let putCity = {}
        let currentCity
        try { 
            //console.log(id)
            if (putCity) {
                //console.log(req.body)
            let currentCity =  await City.findOne({_id:id})
                let {
                    city,
                    country,
                    photo,
                    population,
                    foundation,
                    description
                    } = currentCity
                let result = await validator.validateAsync({city,country,photo,population,foundation,description, ...req.body})
                    if (role === "admin") {
                        putCity = await City.findOneAndUpdate({_id:id},result,{new:true})
                        res.status("200").json({
                            message: "You have updated acity.",
                            response: putCity,
                            success: true,
                        })
                    } else {
                        res.status("401").json({
                            message: "Unauthorized",
                            success: true,
                        })
                    }
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
