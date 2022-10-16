import express from "express";
import { earnedGamePoints, getGamePoints, lossGamePoints } from "../controllers/gamepoint.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/earnedpoints", auth, earnedGamePoints);
router.post("/losspoints", auth, lossGamePoints);
router.get("/getpoints", auth, getGamePoints);

export default router;
