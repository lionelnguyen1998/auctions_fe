import axios from "axios";
const API_URL = "http://localhost:8080/api/";
const register = (name, email, password, address, phone, re_pass, avatar) => {
  const avatars = avatar.preview;
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
    address,
    phone,
    re_pass,
    avatars,
  });
};
const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;