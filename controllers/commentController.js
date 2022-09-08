const Comment = require("../models/Comment");


const commentController ={

    addComment: async (req, res) => {
        try {
            let comment = await new Comment(req.body).save()
            res.status("201").json({
                message: "Your comment has been posted!",
                response: comment._id,
                succes: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "There is something wrong with your comment...",
                succes: false,
            })
        }
    },   
    getComment: async (req, res) => {
        const { id } = req.params
        try {
            let comment = await Comment.findOne({ _id: id })
            if (comment) {
                res.status("200").json({
                    message: "Comment found ✔",
                    response: comment,
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
    getComments: async (req, res) => {
        let comments
        let query = {}
        if(req.query.itinerary){
            query.itinerary = req.query.itinerary
        }
        if (req.query.user) {
            query.user = req.query.user
        }
        try {
            comments = await Comment.find(query)
            .populate("user",{name:1, lastName:1, country:1, photo:1})
            .populate("itinerary",{name:1})
            if (comments) {
                res.status("200").json({
                    message: "The following comments were found.",
                    response: comments,
                    succes: true,
            })
            } else {
                res.status("404").json({
                    message: "No comments could be found...",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your comment could not be added.",
                succes: false,
            })
        }
    },
    modifyComment: async (req, res) => {
        const { id } = req.params
        let comment
        try {
            comment = await Comment.findOneAndUpdate({ _id: id }, req.body, { new: true })
            if (comment) {
                res.status("200").json({
                    message: "You editted your comment.",
                    response: comment,
                    succes: true,
                })
            } else {
                res.status("404").json({
                    message: "Could not find the comment...",
                    succes: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your comment could not be found.",
                succes: false,
            })
        }
    },
    removeComment: async (req, res) => {
        const { id } = req.params
        try {
            await Comment.findOneAndRemove({ _id: id })
            res.status("200").json({
                message: "You deleted your comment.",
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

module.exports = commentController