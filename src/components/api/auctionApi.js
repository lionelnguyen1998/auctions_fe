const { default: axiosClient } = require('./axiosClient');
const auctionApi = {
  getAllAuctions (params) {
    const url = '/auctions';
    return axiosClient.get(url, { params });
  },
  getAllAuctionsOfUser (statusId, params) {
    const url = `/auctions/listAuctionsByUser/${statusId}`;
    return axiosClient.get(url, { params });
  },
  getAllAuctionsOfUserK (userId, statusId, params) {
    const url = `/auctions/listAuctionsByUserK/${userId}/${statusId}`;
    return axiosClient.get(url, { params });
  },
  getList (statusId, params) {
    const url = `/auctions/listAuctionsByStatus/${statusId}`;
    return axiosClient.get(url, { params });
  },
  getListLike (statusId, params) {
    const url = `/likes/${statusId}`;
    return axiosClient.get(url, { params });
  },
  getTotalLikeOfUser () {
    const url = `/listLikes`;
    return axiosClient.get(url);
  },
  getListCommentsBids (type, auctionId, params) {
    const url = `/${type}/${auctionId}`;
    return axiosClient.get(url, {params});
  },
  getListComments (auctionId, params) {
    const url = `/comments/${auctionId}`;
    return axiosClient.get(url, {params});
  },
  createComment (auctionId, content) {
    const url = `/comments/create/${auctionId}`;
    return axiosClient.post(url, {
      content
    });
  },
  deleteComment (commentId) {
    const url = `/comments/delete/${commentId}`;
    return axiosClient.post(url);
  },
  createBid (auctionId, price) {
    const url = `/bids/create/${auctionId}`;
    return axiosClient.post(url, {
      price
    });
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
  listAuctionOfCategory (statusId, params) {
    const url = `listAuctionOfCategory/${statusId}`;
    return axiosClient.get(url, { params });
  },
  getListBrand () {
    const url = 'brands';
    return axiosClient.get(url);
  },
  detail (auctionId) {
    const url = `auctions/detail/${auctionId}`
    return axiosClient.get(url);
  },
  maxBid (auctionId) {
    const url = `auctions/maxBid/${auctionId}`
    return axiosClient.get(url);
  },
  update () {
    const url = 'auctions/update/status';
    return axiosClient.get(url);
  },
  detail1 (auctionId) {
    const url = `auctions/detail1/${auctionId}`;
    return axiosClient.get(url);
  },
  slider () {
    const url = 'slider';
    return axiosClient.get(url);
  },
  like (auctionId) {
    const url = `updateLike/${auctionId}`;
    return axiosClient.post(url);
  },
  search (params) {
    const url = '/search';
    return axiosClient.get(url, {params});
  },
  getListCategoryBuy () {
    const url ='/items/categories'
    return axiosClient.get(url);
  },
  getListItemOfCategoryBuy (categoryId) {
    const url =`/items/listBuy/${categoryId}`
    return axiosClient.get(url);
  },
  getDetailItem (itemId) {
    const url = `/items/detail/${itemId}`;
    return axiosClient.get(url);
  },
  acceptBid (auctionId, selling_info) {
    const url = `/accept/${auctionId}`;
    return axiosClient.post(url, {selling_info});
  },
  getListAuctionByCategory (categoryId, statusId, params) {
    const url = `/auctions/listAuctionOfCategory/${categoryId}/${statusId}`;
    return axiosClient.get(url, {params});
  },
  getListAuctionByType (typeId, statusId, params) {
    const url = `/auctions/listAuctions/${typeId}/${statusId}`;
    return axiosClient.get(url, {params});
  },
  getInfo (auctionId) {
    const url = `/auctions/info/${auctionId}`;
    return axiosClient.get(url);
  },
  editAuction (auctionId) {
    const url = `/auctions/edit/${auctionId}`;
    return axiosClient.post(url);
  }
};

export default auctionApi;

