import { axiosInstance } from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
}

export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized');
}

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
}

export const getSingerListRequest = (category, alpha, count) => {
  let type = -1;
  let area = -1;
  if (category) {
    const [newArea, newType] = category.split('_');
    type = newType;
    area = newArea;
  }
  return axiosInstance.get(`/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${count}`);
}

export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
}

export const getAlbumDetailRequest = id => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
}

export const getSingerInfoRequest = id => {
  return axiosInstance.get(`/artists?id=${id}`);
}
