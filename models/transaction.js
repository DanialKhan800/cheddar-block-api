import mongoose from "mongoose";

const transactionschema = mongoose.Schema({
    amountusd:{type:Number},
    amountcoin:{type:Number},
    cointype:{type:String},
    trxid:{type:String},
    validationhash:{type:String},
    status:{type:Boolean, default:false},
    user:{type:mongoose.Schema.Types.ObjectId, ref:'User'}
});

const transactionModel = mongoose.model('transaction',transactionschema);

export default transactionModel;