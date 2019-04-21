import Axios from "axios";
import URI from "../config/API.json";

const BASE_URL = URI.FLASK_SERVER.BASE_URL + ":" + URI.FLASK_SERVER.PORT;

const options = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  }
};

const signup = (userId, password) => {
  return Axios.post(
    BASE_URL + URI.FLASK_SERVER.SIGNUP,
    {
      userId: userId,
      password: password
    },
    options
  );
};

const login = (userId, password) => {
  return Axios.post(
    BASE_URL + URI.FLASK_SERVER.LOGIN,
    {
      userId: userId,
      password: password
    },
    options
  );
};

const getAccounts = () => {
  return Axios.get(BASE_URL + URI.FLASK_SERVER.ACCOUNTS, {}, options);
};

const transfer = (from, to) => {
  return Axios.post(
    BASE_URL + URI.FLASK_SERVER.TRANSFER,
    {
      from: from,
      to: to,
      amount: 1
    },
    options
  );
};

export default {
  signup: signup,
  login: login,
  getAccounts: getAccounts,
  transfer: transfer
};
