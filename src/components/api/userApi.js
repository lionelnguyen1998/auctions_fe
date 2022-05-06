const { default: axiosClient } = require('./axiosClient');
const userApi = {
  edit(name, email, password, address, phone, re_pass, avatar) {
    return axiosClient.post("/edit", {
      name,
      email,
      password,
      address,
      phone,
      re_pass,
      avatar,
    });
  },
  info() {
    return axiosClient.get("/info");
  },
};

export default userApi;


