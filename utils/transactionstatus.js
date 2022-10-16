import Web3 from "web3";

export const transactionConfirmation = async (trxId) => {
  try {
    const web3 = new Web3(process.env.INFURALINK);
    let trx = await web3.eth.getTransactionReceipt(trxId);
    if (trx.status) {
      console.log("transaction status", trx.status);
      return trx.status;
    }
  } catch (error) {
    console.log(error);
  }
};

export const transactionAmountValue = async (trxId) => {
  const web3 = new Web3(process.env.INFURALINK);
  try {
    let detial = await web3.eth.getTransaction(trxId);
    console.log("convert amount: ", detial.value * 0.000000000000000001);
    return detial.value * 0.000000000000000001;
  } catch (error) {
    console.log(error);
  }
};

export const createwidtraltrx = async (ether, address) => {
  const web3 = new Web3(process.env.INFURALINK);
  const valueinwei = ether * 1000000000000000000;
  try {
    const trx = await web3.eth.accounts.signTransaction(
      {
        to: address,
        value: valueinwei.toString(),
        gas: 2000000,
      },
      process.env.ADMINPRIVATEKEY
    );

    return await web3.eth.sendSignedTransaction(trx.rawTransaction);

  } catch (error) {
    console.log(error);
  }
};

export const getAdminBalance = async () => {
  const web3 = new Web3(process.env.INFURALINK);
  try {
    return await web3.eth.getBalance(process.env.ADMINACCOUNTADD)

  } catch (error) {
    console.log(error);
  }
};