const User = require('../models/User');

const userController ={
    createUser: async (req, res) => {
        try {
            let user = await new User(req.body).save()
            res.status("201").json({
                message: "User created ✔",
                response: user._id,
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Something went wrong ❌",
                succes: false,
            })
        }
    },
    getUser: async (req, res) => {
        const { id } = req.params
        try {
            let user = await User.findOne({ _id: id })
            if (user) {
                res.status("200").json({
                    message: "Found ✔",
                    response: user,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "Coud not be found ❌",
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

}

module.exports =userController;