const { default: axiosClient } = require('./axiosClient');
const auctionApi = {
  getList (statusId) {
    const url = `/auctions/${statusId}`;
    return axiosClient.get(url);
  },
  createAuction (title_ni,category_id, start_date, end_date) {
    const url = 'auctions/create';
    return axiosClient.post(url, {
      title_ni,
      category_id,
      start_date,
      end_date
    });
  },
  createItem (auctionId, name, brand_id, starting_price, description, series, images) {
    const url = `items/create/${auctionId}`;
    return axiosClient.post(url, {
      auctionId,
      name,
      brand_id,
      starting_price,
      description,
      series,
      images
    });
  },
  getListCategory () {
    const url = 'categories';
    return axiosClient.get(url);
  },
  getListBrand () {
    const url = 'brands';
    return axiosClient.get(url);
  },
  detail (auctionId) {
    const url = `auctions/detail/${auctionId}`
    return axiosClient.get(url);
  },
};

export default auctionApi;

