const mongoose= require ('mongoose')
    const commentSchema = new mongoose.Schema(
        {
        comment:{type: String,required:true},
        user:{type: mongoose.Types.ObjectId, ref:'users', required:true},
        itinerary:{type: mongoose.Types.ObjectId, ref:'itineraries', required: true},
        date: {type: Date, required: true }
        }
    );

    const Comment = mongoose.model("comments",commentSchema);


module.exports = Comment
