import gameActivityModel from "../models/gameactivity.model.js";

export const insertGameActivityData = async (reqObje) => {
  try {
    const result = new gameActivityModel(reqObje);
    return await result.save();
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getGameActivityData = async (game, user) => {
  try {
    return await gameActivityModel.findOne({
      gameid: game,
      userid: user,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateGameActivityTimestampData = async (
  game,
  user,
  timestamp
) => {
  try {
    return await gameActivityModel.findOneAndUpdate(
      {
        gameid: game,
        userid: user,
      },
      { gametimestamp: timestamp }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateGameActivityData = async (filter, data) => {
  try {
    return await gameActivityModel.findOneAndUpdate(filter, data);
  } catch (error) {
    console.log(error);
    return false;
  }
};
