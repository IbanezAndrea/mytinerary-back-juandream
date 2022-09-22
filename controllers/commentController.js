const Comment = require("../models/Comment");
const joi = require('joi')

const validator = joi.object({
    comment: 
        joi.string()
        .min(1)
        .max(250)
        .required()
        .messages({
            'any.required': 'COMMENT_REQUIRED',
            'string.empty': 'COMMENT_REQUIRED',
            'string.min': 'COMMENT_TOO_SHORT',
            'string.max': 'COMMENT_TOO_LARGE',
        }),
    user: 
        joi.string()
        .hex()
        .required()
        .messages({
            'any.required': 'USER_REQUIRED',
            'string.hex': 'USER_INVALID'
        }),
    itinerary: 
        joi.string()
        .hex()
        .required()
        .messages({
            'any.required': 'ITINERARY_REQUIRED',
            'string.hex': 'ITINERARY_INVALID'
        })
})

const commentController ={

    addComment: async (req, res) => {
        let {
            comment:textComment,
            itinerary
        } = req.body
        let user = req.user.userId
        try {
            let result = await validator.validateAsync(
                {comment: textComment,
                itinerary,
                user: user.toString()})
            let comment = await new Comment({
                ...result,
                date: new Date()
            }).save()
            res.status("201").json({
                message: "Your comment has been posted!",
                response: comment._id,
                success: true,
            })
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "There is something wrong with your comment...",
                success: false,
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
            .populate("user",{name:1, lastname:1, country:1, photo:1})
            .populate("itinerary",{name:1})
            if (comments) {
                res.status("200").json({
                    message: "The following comments were found.",
                    response: comments,
                    success: true,
            })
            } else {
                res.status("404").json({
                    message: "No comments could be found...",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your comment could not be added.",
                success: false,
            })
        }
    },
    modifyComment: async (req, res) => {
        const { id } = req.params
        let { comment: commentText } = req.body
        const {userId, role} = req.user
        let comment
        try {
            comment = await Comment.findOne({ _id: id })
            if (comment) {
                if (comment.user.toString() === userId.toString() || role === "admin") {
                    comment.comment = commentText
                    comment.date = new Date()
                    await comment.save()
                    res.status("200").json({
                        message: "You editted your comment.",
                        response: comment,
                        success: true,
                    })
                } else {
                    res.status("401").json({
                        message: "Unahutorized",
                        success: false,
                    })
                }
            } else {
                res.status("404").json({
                    message: "Could not find the comment...",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Your comment could not be found.",
                success: false,
            })
        }
    },
    removeComment: async (req, res) => {
        const { id } = req.params
        const { userId, role } = req.user
        let comment
        try {
            comment = await Comment.findOne({_id:id})
            if (comment.user.toString() === userId.toString() || role === "admin") {
                await Comment.findOneAndRemove({ _id: id })
                res.status("200").json({
                    message: "You deleted this comment.",
                    success: true,
                })
            } else {
                res.status("401").json({
                    message: "Unahutorized",
                    success: true,
                })
            }
        } catch (error) {
            console.log(error)
            res.status("400").json({
                message: "Error",
                success: false,
            })
        }
    }
}

module.exports = commentController