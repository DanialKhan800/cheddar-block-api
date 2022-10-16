import {
  getGamePoint,
  insertGamePoint,
  updateGamePoint,
} from "../services/gamepoint.js";
import { checkUserById } from "../services/user.js";

export const purchasedGamePoints = async (user, points) => {
  try {
    let getpoints = await getGamePoint(user);
    if (getpoints) {
      if (getpoints.points != null) {
        points = points + getpoints.points;
      } else {
        points = 0;
      }

      return await updateGamePoint(user, points );
    } else {
      return await insertGamePoint( user, points );
    }
  } catch (error) {
    return false;
  }
};

export const earnedGamePoints = async (req, res) => {
  const { earnedpoints } = req.body;
  const userId = req.userId;
  try {
    const user = await checkUserById(userId);
    if (!user) {
      return res.status(400).json({ message: "User is not exists." });
    }
    let getpoints = await getGamePoint(user);
    if (getpoints) {
      let points = earnedpoints + getpoints.points;

      const updatepoint = await updateGamePoint( user, points );
      res
        .status(200)
        .send({ message: "Poinsts are added", updatedPoints: updatepoint });
    } else {
      res.status(500).send({ message: "somthing is wrong" });
    }
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
};

export const lossGamePoints = async (req, res) => {
  const { losspoints } = req.body;
  const userId = req.userId;

  try {
    const user = await checkUserById(userId);
    if (!user) {
      return res.status(400).json({ message: "User is not exists." });
    }
    let getpoints = await getGamePoint(user);

    if (getpoints) {
      let points = getpoints.points - losspoints;

      const updatepoint = await updateGamePoint( user, points );
      res
        .status(200)
        .send({ message: "Poinsts are added", updatedPoints: updatepoint });
    } else {
      res.status(500).send({ message: "somthing is wrong" });
    }
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
};


export const saleGamePoints = async (spoints, userId) => {

  try {
    const user = await checkUserById(userId);
    if (!user) {
      return res.status(400).json({ message: "User is not exists." });
    }
    let getpoints = await getGamePoint(user);

    if (getpoints) {
      let points = getpoints.points - spoints;

      const updatepoint = await updateGamePoint( user, points );
      return updatepoint
    } 
    return false
  } catch (error) {
    return false
  }
};


export const getGamePoints = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await checkUserById(userId);
    
    if (!user) {
      return res.status(400).json({ message: "User is not exists." });
    }
    let getpoints = await getGamePoint(user);

    if (getpoints) {
      res
        .status(200)
        .send({ message: "Points are fetched", points: getpoints.points });
    } else {
      res.status(500).send({ message: "somthing is wrong" });
    }
  } catch (error) {
    res.status(500).send({ message: "error" });
  }
};
