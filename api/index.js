import Axios from "axios";
import URI from "../config/API.json";

const BASE_URL = URI.DJANGO_SERVER.BASE_URL + ":" + URI.DJANGO_SERVER.PORT;

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
};

const signup = (userId, password) =>
  Axios.post(
    BASE_URL + URI.DJANGO_SERVER.SIGNUP,
    {
      userId: userId,
      password: password
    },
    options
  );

const login = (userId, password) =>
  Axios.post(
    BASE_URL + URI.DJANGO_SERVER.LOGIN,
    {
      userId: userId,
      password: password
    },
    options
  );

const deployContract = (userId, address) =>
  Axios.post(
    BASE_URL + URI.DJANGO_SERVER.DEPLOY,
    { userId: userId, address: address },
    options
  );

const transferToken = (receiver, amount, ca) =>
  Axios.post(
    BASE_URL + URI.DJANGO_SERVER.TRANSFER_TOKEN,
    {
      receiver: {
        userId: receiver.userId,
        address: receiver.address
      },
      amount: parseInt(amount),
      contractAddress: ca
    },
    options
  );

const transferTokenFrom = (sender, receiver, amount, ca) =>
  Axios.post(
    BASE_URL + URI.DJANGO_SERVER.TRANSFER_TOKEN_FROM,
    {
      sender: {
        userId: sender.userId,
        address: sender.address
      },
      receiver: {
        userId: receiver.userId,
        address: receiver.address
      },
      amount: parseInt(amount),
      contractAddress: ca
    },
    options
  );

const getAccounts = () =>
  Axios.get(BASE_URL + URI.DJANGO_SERVER.ACCOUNTS, {}, options);

const unlockAccounts = () =>
  Axios.get(BASE_URL + URI.DJANGO_SERVER.UNLOCK, {}, options);

const getCoinbase = () =>
  Axios.get(BASE_URL + URI.DJANGO_SERVER.COINBASE, {}, options);

const getBalanceOf = (userId, address, contractAddress) =>
  Axios.post(
    BASE_URL + URI.DJANGO_SERVER.BALANCE,
    {
      userId: userId,
      address: address,
      contractAddress: contractAddress
    },
    options
  );

const getBalanceAll = ca =>
  Axios.post(
    BASE_URL + URI.DJANGO_SERVER.BALANCE_ALL,
    {
      contractAddress: ca
    },
    options
  );

const getTransactionOf = txHash =>
  Axios.post(
    BASE_URL + URI.DJANGO_SERVER.TRANSACTION,
    {
      txHash: txHash
    },
    options
  );

const getTransactionAll = () =>
  Axios.get(BASE_URL + URI.DJANGO_SERVER.TRANSACTION_ALL, {}, options);

const getMininingStatus = () =>
  Axios.get(BASE_URL + URI.DJANGO_SERVER.MINING_STATUS, {}, options);

const setMining = status =>
  Axios.post(
    BASE_URL + URI.DJANGO_SERVER.MINING_SET,
    {
      status: status
    },
    options
  );

export default {
  signup: signup,
  login: login,
  deploy: deployContract,
  accounts: getAccounts,
  transferToken: transferToken,
  transferTokenFrom: transferTokenFrom,
  unlock: unlockAccounts,
  coinbase: getCoinbase,
  balanceOf: getBalanceOf,
  balanceAll: getBalanceAll,
  transactionOf: getTransactionOf,
  transactionAll: getTransactionAll,
  statusMining: getMininingStatus,
  setMining: setMining
};
