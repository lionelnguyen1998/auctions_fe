const { default: axiosClient } = require('./axiosClient');
const userApi = {
  edit(name, email, password, address, phone, re_pass, avatars) {
    const avatar = avatars.preview;
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
};

export default userApi;


