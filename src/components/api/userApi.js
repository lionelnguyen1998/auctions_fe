const { default: axiosClient } = require('./axiosClient');
const userApi = {
  edit(name, email, address, phone, avatar) {
    return axiosClient.post("/edit", {
      name,
      email,
      address,
      phone,
      avatar,
    });
  },
  info() {
    return axiosClient.get("/info");
  },
  changepass(old_pass, new_pass, re_pass) {
    return axiosClient.post("/changepass", {
        old_pass,
        new_pass,
        re_pass
    }); 
  },
}
export default userApi;
