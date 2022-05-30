import axios from 'axios';
import authHeader from "../services/auth-header";

const axiosClient = axios.create({
  baseURL: 'https://auctions-app-2.herokuapp.com/api',
  headers: authHeader()
});

export default axiosClient;
