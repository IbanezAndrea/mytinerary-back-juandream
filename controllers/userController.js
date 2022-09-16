const User = require('../models/User');
const crypto = require('crypto')
const bcryptjs = require('bcryptjs');
const sendMail = require('./sendMail')
const joi = require('joi')

const validator =joi.object({
    name: 
        joi.string()
        .pattern(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)
        .min(3)
        .max(15)
        .required(),
    lastname: 
        joi.string()
        .pattern(/^[ñA-Za-z _]*[ñA-Za-z][ñA-Za-z _]*$/)
        .min(3)
        .max(15)
        .required() ,
    photo: 
        joi.string()
        .uri()
        .required() ,
    country:
        joi.string()
        .min(4)
        .max(30)
        .required() ,
    email: 
        joi.alternatives()
        .try(
            joi.string()
                .lowercase()
                .email({
                    minDomainSegments: 2,
                    tlds: {
                    allow: ["com", "net", "uy", "ar", ],
                    },
                }),
            )
        .required()
        .error(new Error("Invalid email")),
    password: 
        joi.string()
        .pattern(new
            RegExp('^[a-zA-Z0-9]{3,30}$')),
    role: 
        joi.string()
        .min(3)
        .max(15)
        .required(),
    from: 
        joi.string()
        .min(3)
        .max(15)
        .required()
})
const userController ={
    userSignUp: async (req, res) => {

        try{
            let result = await validator.validateAsync(req.body)
            let  {
                name,
                lastname,
                photo,
                country,
                email,
                password,
                role,
                from
            } = result
            let user = await User.findOne({email})
                if (!user){
                    let loggedIn = false;
                    let verified = false;
                    let code =  crypto
                        .randomBytes(15)
                        .toString('hex')
                    if(from === 'form'){ //from form
                        password = bcryptjs.hashSync(password,10);
                        user = await new User({ name, lastname, photo, country, email, password: [password], role, from: [from], loggedIn, verified, code }).save()
                        sendMail(email,code)
                        res.status(201).json({
                            message: "User signed ✔",
                            success: true,
                            })
                    } else{ // from socialmedia
                        password = bcryptjs.hashSync(password,10);
                        verified = true,
                        user = await new User({ name, lastname, photo, country, email, password: [password], role, from: [from], loggedIn, verified, code }).save()
                        res.status(201).json({
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
                        user.password.push(bcryptjs.hashSync(password,10))
                        await user.save()
                        res.status(201).json({
                            message: "User signed up from "+from,
                            success: true
                            })
                    }
                }
        }catch (error){
            console.log(error)  
            res.status(400).json({
                message: "could't signed up",
                success: false
                })
        }
    },
    verifyMail: async (req, res) => {
        const {code} = req.params
        try {
            let user = await User.findOne({ code })
            if (user) {
                user.verified = true
                await user.save()
                res.status("200").redirect(301, 'http://my-tinerary-juandream.herokuapp.com/signin')

            } else {
                res.status("404").json({
                    message: "This email does not belong to an account ❌",
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
    userSignIn: async (req,res) =>{
            const {email, password, from} = req.body
        try{
            const user= await User.findOne({email})
                if (!user){
                res.status(404).json({
                    success:false,
                    message: "User does not exist, please sign up!"
                })
            }else if (user.verified){
                    const checkPass= user.password.filter(passwordElement=> bcryptjs.compareSync(password, passwordElement))
                if(from === 'form'){ // If user tries to log by form
                        if(checkPass.length > 0){// if password matches
                            const loginUser= {
                                id:user._id,
                                name: user.name,
                                email: user.email,
                                role: user.role,
                                from: user.from,
                                photo:user.photo
                            }

                            user.loggedIn = true
                            await user.save()
                            
                            res.status(200).json({
                                success:true,
                                response: {user: loginUser},
                                message: "Welcome " + user.name
                            })
                        }else{ // if password does not match
                            res.status(401).json({
                                success:false,
                                message: "Wrong username or password ❌"
                            })
                        }
                }else{ // If user tries to log by socialmedia
                    if(checkPass.length > 0){// if password matches
                        const loginUser= {
                            id:user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            from: user.from,
                            photo:user.photo
                        }

                        user.loggedIn = true
                        await user.save()
                        
                        res.status(200).json({
                            success:true,
                            response: {user: loginUser},
                            message: "Welcome " + user.name
                        })
                    }else{ // if password does not match
                        res.status(400).json({
                            success:false,
                            message: "Invalid credentials ❌"
                            })
                        }
                    }
            }else{ // If user exists but is not verified
                res.status(401).json({
                    success:false,
                    message: "Please, verify your email account and try again..."
                })
            }
        }catch (error){
            console.log(error)
            res.status(400).json({
                success:false,
                message: "Error signing in ❌"
            })
        }
    },
    userSignOut: async(req,res) => {
        const {email} = req.body
        try{
            let user = await User.findOne({email:email})
                    if (user){
                        user.loggedIn = false
                        await user.save()
                                res.status(200).json({
                                    message: 'You have successfully signed out!',
                                    success: true,
                                    response: user.loggedIn
                            })
                    } else {
                        res.status(404).json({
                            message: 'No user found...',
                            success: false
                        })
                    }
            } catch (error) {
                console.log(error);
                    res.status(400).json({
                        message: 'Failed to sign out...',
                        success:false
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