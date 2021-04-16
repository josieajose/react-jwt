import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getUserProfile = () => {
  return axios.get(API_URL + "profile", { headers: authHeader() });
};

export default {
  getUserProfile,
};
