import gamepointModel from "../models/gamepoint.js";

export const insertGamePoint = async (reqObje) => {
  const { user, points } = reqObje;

  try {
    const result = new gamepointModel({
      user: user,
      points: points,
    });
    return await result.save();
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getGamePoint = async (user) => {
  try {
    console.log(user)
    return await gamepointModel.findOne({
      user: user,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateGamePoint = async (user,points) => {
  // const { user, points } = reqObje;
  try {
    return await gamepointModel.findOneAndUpdate(
      { user: user },
      { points: points },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};
