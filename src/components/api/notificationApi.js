const { default: axiosClient } = require('./axiosClient');
const notificationApi = {
    getAllNotification (params) {
        const url = '/notifications';
        return axiosClient.get(url, { params });
    },
    getReadNotification (auctionId) {
        const url = `/notifications/read/${auctionId}`;
        return axiosClient.get(url);
    },
    deleteNotification (auctionId) {
        const url = `/notifications/delete/${auctionId}`;
        return axiosClient.post(url, { auctionId });
    },
    getNews (params) {
        const url = '/news';
        return axiosClient.get(url, { params });
    },
};

export default notificationApi;

