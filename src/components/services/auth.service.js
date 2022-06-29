import axios from "axios";
const API_URL = "http://localhost:8080/api/";
const register = (name, email, password, address, phone, re_pass, avatar) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
    address,
    phone,
    re_pass,
    avatar,
  });
};
const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.code === 1000) {
        localStorage.setItem("user", JSON.stringify(response.data.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
  // return axios
  //   .get(API_URL + "info")
  //   .then((response) => {
  //     return response.data;
  //   });
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;