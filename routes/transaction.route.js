import express from "express";

import {
  getRates,
  createDepositeTrx,
  confirmDepositeTrx,
  confirmwithdrawalTrx,
} from "../controllers/transaction.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/getrates", auth, getRates,createDepositeTrx);
router.post("/createdepositetransaction", auth, createDepositeTrx);
router.post("/confirmdepositetransaction", auth, confirmDepositeTrx);
router.post("/createwithdrawaltrasaction", auth, getRates, confirmwithdrawalTrx);

export default router;
