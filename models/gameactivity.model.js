import mongoose from "mongoose";

const gameActivitySchema = mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  gameid: { type: mongoose.Schema.Types.ObjectId, ref: "game" },
  gametimestamp: { type: String },
  inactivitytimer: { type: String },
  eventstatus: { type: String },
  amount: { type: Number },
  bitsize: { type: Number },
  spintype: { type: String },
  rtp:{type:Number},
  isrtp:{type:Boolean},
  playerbetperline:{type:Number},
  player_paylines:{type:Number}
});

var gameActivityModel = mongoose.model("gameactivity", gameActivitySchema);

export default gameActivityModel;
