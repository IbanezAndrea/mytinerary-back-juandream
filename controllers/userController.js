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
                .populate('itineraries', {name:1, city:1})
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
    getUsers: async (req, res) => {
        let users
        let query = {}
        if(req.query.users){
            query.users= req.query.users
        }
        try {
            users = await User.find(query)
            if (users) {
                res.status("200").json({
                    message: "Users found!",
                    response: users,
                    succes: true,
            })
            } else {
                res.status("404").json({
                    message: "No users could be found...",
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
    modifyUser: async (req, res)=>{
        const { id } = req.params
        let putUser = {}
        try {
            putUser= await User.findOneAndUpdate({_id:id},req.body,{new:true})
            if (putUser) {
                res.status("200").json({
                    message: "User updated.",
                    response: putUser,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "this User does not exist.",
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
    removeUser: async (req, res) => {
        const { id } = req.params
        try {
            await User.findOneAndDelete({ _id: id })
            res.status("200").json({
                message: "You deleted an User.",
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

module.exports =userController;