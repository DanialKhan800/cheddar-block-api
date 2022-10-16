import express from "express";
import {addGame,getAllGames,getGameByID} from '../controllers/game.controller.js'
import auth from "../middleware/auth.js";
import adminauth from "../middleware/authadmin.js";
import {validate, createGameDataRules,getGameByIDDataRules} from "../validation/game/game.validator.js"

const router = express.Router();

router.post("/add", createGameDataRules(),validate, adminauth, addGame);
router.get("/getallgames", auth, getAllGames);
router.post("/getgamebyid", getGameByIDDataRules(),validate, auth, getGameByID);

export default router;
