import { body, validationResult } from "express-validator";


export const createGameDataRules = () => {
  return [
    body("title").notEmpty().withMessage("Game title is required"),
    body("description").notEmpty().withMessage("Game description is required"),
    body("creator").notEmpty().withMessage("Creator is required"),
    body("paydata").notEmpty().withMessage("Pay data of game is required"),
    body("probdata").notEmpty().withMessage("Prob data of game is required"),
  ];
};

export const getGameByIDDataRules = () => {
  return [
    body("gameid").notEmpty().withMessage("Game title is required"),
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

