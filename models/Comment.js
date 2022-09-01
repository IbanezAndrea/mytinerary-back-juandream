const mongoose= require ('mongoose')
    const commentSchema = new mongoose.Schema(
        {
        comment:{type: String,required:true},
        user:{type: String},
        itinerary:{type: String}
        }
    );

    const Comment = mongoose.model("comments",commentSchema);


module.exports = Comment
