import { createAsyncThunk } from "@reduxjs/toolkit";

import { getBannerRequest, getRecommendListRequest } from "@/api/request";
import * as actionTypes from "./constants";

export const fetchBannerList = createAsyncThunk(
  actionTypes.CHANGE_BANNER,
  async () => {
    const res = await getBannerRequest();
    return res.banners;
  }
);

export const fetchRecommendList = createAsyncThunk(
  actionTypes.CHANGE_RECOMMEND_LIST,
  async () => {
    const res = await getRecommendListRequest();
    return res.result;
  }
);

export const changeEnterLoading = (data) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  payload: data
});