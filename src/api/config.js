import axios from 'axios'

export const baseUrl = 'https://netease-cloud-music-api-orcin-eight.vercel.app/'

const axiosInstance = axios.create({
  baseURL: baseUrl
});

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, 'network error')
  }
);

export {
  axiosInstance
};
