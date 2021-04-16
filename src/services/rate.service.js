import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getExchangeRate = () => {
  return axios.get(API_URL + "exchange-rate", { headers: authHeader() });
};

export default {
  getExchangeRate,
};
