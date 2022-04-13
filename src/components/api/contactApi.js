const { default: axiosClient } = require('./axiosClient');
const contactApi = {
    contactUs(name, email, phone, content, files, report_type) {
        const file = files[0];
        return axiosClient.post('/contactUs', {
        name,
        email,
        phone,
        content,
        file,
        report_type
        });
    },
}

export default contactApi;

