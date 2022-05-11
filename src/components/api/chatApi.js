const { default: axiosClient } = require('./axiosClient');
const chatApi = {
    getChats () {
        const url = '/chat';
        return axiosClient.get(url);
    },
    getMessages (chatId) {
        const url = `/chat/listMessages/${chatId}`;
        return axiosClient.get(url);
    },
    getInfoUserReceived (chatId) {
        const url = `/chat/info/${chatId}`;
        return axiosClient.get(url);
    },
    getUserSendInfo (userSendId) {
        const url = `/chat/userSendInfo/${userSendId}`;
        return axiosClient.get(url);
    },
    getAllUsers () {
        const url = '/users';
        return axiosClient.get(url);
    },
    createChat (userReceiveId) {
        const url = `/chat/conversation/${userReceiveId}`;
        return axiosClient.post(url);
    }
};

export default chatApi;

