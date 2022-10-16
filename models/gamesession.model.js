import mongoose from 'mongoose';

const gameSessionSchema = mongoose.Schema({
    sessionid: String,
    totalbetsession:{type:Number},
    totalpaidspin:{type:Number},
    gametype:{type:String},
    userid:{type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    gameid:{type:mongoose.Schema.Types.ObjectId, ref:'Users'}
})

var gameSessionModel = mongoose.model('gamesession', gameSessionSchema);

export default gameSessionModel;