import mongoose from "mongoose";

const gamepointschema = mongoose.Schema({
    points:{type:Number},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'Users'}
});

const gamepointModel = mongoose.model('gamepoint',gamepointschema);

export default gamepointModel;