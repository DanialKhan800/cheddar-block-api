import convert from "crypto-convert";
import { checkUserById } from "../services/user.js";
import {
  checkValidateHash,
  getTrxByID,
  insertTrxData,
  updateTrxData,
} from "../services/transactions.js";
import crypto from "crypto";
import {
  transactionConfirmation,
  transactionAmountValue,
  createwidtraltrx,
  getAdminBalance
} from "../utils/transactionstatus.js";
import { sendMail } from "../utils/sendemail.js";
import { purchasedGamePoints,saleGamePoints } from "../controllers/gamepoint.js";


export const getRates = async (req, res, next) => {
  let obj;
  const { usd, chain } = req.body;
  try {
    if (!convert.isReady) {
      await convert.ready();
    }
    if (chain === "ETH") {
      obj = await convert.USD.ETH(usd);
      // obj = new convert.from("USD").to("ETH").amount(usd)
      console.log(obj, "tesssssssss");
    }
    req.body.rates = obj;
    next();
    // res.status(200).json({ message: "sucess", data: obj });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const createDepositeTrx = async (req, res) => {
  let obj;
  const { usd, rates, chain } = req.body;
  const userId = req.userId;
  try {
    const existingUser = await checkUserById(userId);
    if (!existingUser) {
      return res.status(400).json({ message: "User is not exists." });
    }

    let linkhash = crypto.randomBytes(20).toString("hex");
    console.log(linkhash);
    const trxObj = await insertTrxData({
      usd,
      rates,
      chain,
      linkhash,
      existingUser,
    });
    if (trxObj) {
      sendMail(
        "Transaction verification link",
        "link" + trxObj.validationhash,
        existingUser.email
      );
      res.status(200).json({ message: "sucess", data: trxObj });
    } else {
      res
        .status(500)
        .json({ message: "Error occured in transaction creation" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const confirmDepositeTrx = async (req, res) => {
  const { trxid, linkhash } = req.body;
  const userId = req.userId;
  try {
    const existingUser = await checkUserById(userId);
    if (!existingUser) {
      return res.status(400).json({ message: "User is not exists." });
    }

    const validatelinkhash = await checkValidateHash({
      existingUser,
      linkhash,
    });

    if (!validatelinkhash) {
      return res
        .status(400)
        .json({ message: "Transaction is already confirm." });
    }

    const trxstatus = await transactionConfirmation(trxid);
    if (!trxstatus) {
      return res
        .status(400)
        .json({ message: "Transaction are not compeleted yet." });
    }

    const trxDetails = await getTrxByID(linkhash);

    const trxvalue = await transactionAmountValue(trxid);

    if (trxvalue >= trxDetails.amountcoin) {
      const updateData = await updateTrxData({ trxid, linkhash });
      let points = process.env.POINTSCONVERSIONRATES * trxDetails.amountusd;

      const gamepoints = await purchasedGamePoints(existingUser, points);
      res.status(200).json({
        message: "sucess",
        trxData: updateData,
        gamePoints: gamepoints,
      });
    } else {
      res
        .status(500)
        .json({ message: "Error occured in transaction creation" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const confirmwithdrawalTrx = async (req, res) => {
  const { points, trxaddress, rates } = req.body;
  const userId = req.userId;

  console.log(req.body);
  try {
    const existingUser = await checkUserById(userId);
    if (!existingUser) {
      return res.status(400).json({ message: "User is not exists." });
    }

    const balance = await getAdminBalance();
    if(balance < rates){
      return res.status(400).json({ message: "Admin have insufficent balance." });
    }

    const trxdetail = await createwidtraltrx(rates, trxaddress);

    // console.log(trxdetail);

    // console.log(trxdetail.status)

    const objpoints = await saleGamePoints(points,userId);
    
    // console.log(objpoints)

    // res.status(200).json({ message: objpoints.points+" Points are sale" });
    res.status(200).json({ message: "sucess", data: objpoints });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
