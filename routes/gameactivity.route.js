import express from "express";
import auth from "../middleware/auth.js";
import {startGameActivity, updateGameActivity, getUserGamePlayMode, getStartCrashGame,updateCrashGame} from '../controllers/gameactivity.controller.js'
import { updateGameActivityDataRules, validate,updateCrashGameActivityDataRules} from "../validation/gameactivty/gameactivity.validator.js"


const router = express.Router();

router.get("/startgame/:gameid", auth, startGameActivity)
router.post("/updateactivity" ,auth, updateGameActivity)
router.get("/getuserplaymode", auth, getUserGamePlayMode)
router.get("/getstartcrashgame/:gameid", auth, getStartCrashGame)
router.post("/updatecrashgame", updateCrashGameActivityDataRules(), validate ,auth, updateCrashGame)

export default router;