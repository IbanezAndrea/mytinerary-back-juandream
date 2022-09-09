const User = require('../models/User');
const crypto = require('crypto')
var bcryptjs = require('bcryptjs');

const userController ={
    userSingUp: async (req, res) => {
            let {
                name,
                photo,
                email,
                passsword,
                role,
                from
            }= req.body
        try{
            let user = await User.findOne({email})
                if (!user){
                    let logged = false;
                    let verified = false;
                    let code =  crypto
                    .randomBytes(15)
                    .toString('hex')
                            if(from === 'form'){ //from form
                                passsword = bcryptjs.hashSync(pass,10);
                                user = await new User({name,photo,email,password:[passsword],role,from:[from],logged,verified,code}).save()
                                //verification email here
                                    res.status(201).json({
                                        message: "User signed ✔",
                                        success: true,
                                            })
                                } else{ // from socialmedia
                                    pass = bcryptjs.hashSync(pass,10);
                                    verified = true,
                                    user = await new User({name,photo,email,password:[passsword],role,from:[from],logged}).save()
                                    res.status(201).json(
                                            {
                                                message: "User signed from "+from,
                                                success: true,
                                            })
                                    } 
                                } else{ //If user exists
                                    if(user.from.includes(from)){ //if user from property includes from["google"] like so
                                        res.status(200).json({
                                            message: "User already exists...",
                                            success: false 
                                        })
                    } else{  // ===> user.from = ['google','facebook'] includes from other socialmedia
                            user.from.push(from);
                            user.verified = true;
                            user.password.push(bcryptjs.hashSync(pass,10))
                                await user.save()
                                    res.status(201).json({
                                        message: "User signed up from "+from,
                                        success: true
                                        })
                                    }}
                    }catch (error){
                        console.log(error)
                                                
                        res.status(400).json({
                        message: "could't signed up",
                        success: false
                            })
                        }},

    getUser: async (req, res) => {
        const { id } = req.params
        
        try {
            let user = await User.findOne({ _id: id })
                .populate('itineraries', {name:1, city:1})
            if (user) {
                res.status("200").json({
                    message: "Found ✔",
                    response: user,
                    success: true,
                })
            } else {
                res.status("404").json({
                    message: "Coud not be found ❌",
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
                    success: true,
            })
            } else {
                res.status("404").json({
                    message: "No users could be found...",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "error",
                success: false,
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
                    success: true,
                })
            } else {
                res.status("404").json({
                    message: "this User does not exist.",
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
    removeUser: async (req, res) => {
        const { id } = req.params
        try {
            await User.findOneAndDelete({ _id: id })
            res.status("200").json({
                message: "You deleted an User.",
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

module.exports =userController;