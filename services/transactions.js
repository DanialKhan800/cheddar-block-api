import transactionModel from "../models/transaction.js";

export const checkValidateHash = async (reqObje) => {
  const { existingUser, linkhash } = reqObje;

  try {
    return await transactionModel.findOne({
      user: existingUser,
      validationhash: linkhash,
      status: false,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const insertTrxData = async (reqObje) => {
  const { usd, rates, chain, linkhash, existingUser } = reqObje;

  try {
    const result = new transactionModel({
      amountusd: usd,
      amountcoin: rates,
      cointype: chain,
      validationhash: linkhash,
      user: existingUser,
    });
    return await result.save();
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateTrxData = async (reqObje) => {
  const { trxid, linkhash } = reqObje;

  try {
    return await transactionModel.findOneAndUpdate(
      { validationhash: linkhash },
      { trxid: trxid, status: true },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};


export const getTrxByID = async (linkhash) => {

  try {
    return await transactionModel.findOne(
      { validationhash: linkhash },
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};
