import gameModel from "../models/game.model.js";

export const insertGameData = async (reqObje) => {
  try {
    const result = new gameModel(reqObje);
    return await result.save();
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAllGamesData = async () => {
  try {
    return await gameModel.find({});
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getGameByIDData = async (id) => {
  try {
    return await gameModel.findById(id);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateAwardedSpins = async (filter, data) => {
  try {
    return await gameModel.findByIdAndUpdate(filter, data, { new: true });
  } catch (error) {
    console.log(error);
    return false;
  }
};
