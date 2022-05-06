const { default: axiosClient } = require('./axiosClient');
const notificationApi = {
    getAllNotification (params) {
        const url = '/notifications';
        return axiosClient.get(url, { params });
    },
};

export default notificationApi;

