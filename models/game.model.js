import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
    title: {type:String},
    description: {type:String},
    creator: {type:String},
    paydata: {type:String},
    probdata: {type:String},
    bonusspins:{type:Number, default:0}
})

var gameModel = mongoose.model('game', gameSchema);

export default gameModel;