const { default: axiosClient } = require('./axiosClient');
const chatApi = {
    getChats () {
        const url = '/chat';
        return axiosClient.get(url);
    },
};

export default chatApi;

