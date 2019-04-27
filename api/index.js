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

const getAccounts = () =>
  Axios.get(BASE_URL + URI.DJANGO_SERVER.ACCOUNTS, {}, options);

const unlockAccounts = () =>
  Axios.get(BASE_URL + URI.DJANGO_SERVER.UNLOCK, {}, options);

const getCoinbase = () =>
  Axios.get(BASE_URL + URI.DJANGO_SERVER.COINBASE, {}, options);

const transfer = (from, to) =>
  Axios.post(
    BASE_URL + URI.DJANGO_SERVER.TRANSFER,
    {
      from: from,
      to: to,
      amount: 1
    },
    options
  );

export default {
  signup: signup,
  login: login,
  accounts: getAccounts,
  transfer: transfer,
  unlock: unlockAccounts,
  coinbase: getCoinbase
};
