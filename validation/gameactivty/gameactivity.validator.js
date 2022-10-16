import { body, validationResult } from "express-validator";


export const updateGameActivityDataRules = () => {
  return [
    body("user_id").notEmpty().withMessage("user id is required"),
    body("game_id").notEmpty().withMessage("Game id  is required"),
    body("session_id").notEmpty().withMessage("Session id is required"),
    body("awardedspin_left").notEmpty().withMessage("Awarded spin of game is required"),
    body("game_free_spins").notEmpty().withMessage("Free spin of game is required"),
    body("total_session_bet_amount").notEmpty().withMessage("Bet session amount of game is required"),
    body("total_paid_spins").notEmpty().withMessage("total paid of game is required"),
    body("current_credit").notEmpty().withMessage("current credit of game is required"),
    body("status").notEmpty().withMessage("Player status of game is required"),
    body("amount").notEmpty().withMessage("Amount of game is required"),
    body("payline").notEmpty().withMessage("Pay line of game is required"),
    body("bit_size").notEmpty().withMessage("Bit size of game is required"),
    body("spin_type").notEmpty().withMessage("Spin type of game is required"),
    body("gametimestamp").notEmpty().withMessage("Game timestamp is required"),
  ];
};


export const updateCrashGameActivityDataRules = () => {
  return [
    body("userid").notEmpty().withMessage("user id is required"),
    body("gameid").notEmpty().withMessage("Game id  is required"),
    body("sessionid").notEmpty().withMessage("Session id is required"),
    body("tokens").notEmpty().withMessage("Awarded spin of game is required"),
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

