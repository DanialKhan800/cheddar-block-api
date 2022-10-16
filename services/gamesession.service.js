import gameSessionModel from "../models/gamesession.model.js";

export const insertUserGameSessionData = async (reqObje) => {
  try {
    const result = new gameSessionModel(reqObje);
    return await result.save();
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateGameSessionData = async (filter, data) => {
  try {
    return await gameSessionModel.findOneAndUpdate(filter, data, { new: true });
  } catch (error) {
    console.log(error);
    return false;
  }
};
