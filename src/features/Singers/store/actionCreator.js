import { createAsyncThunk } from "@reduxjs/toolkit";

import { getHotSingerListRequest, getSingerListRequest } from "@/api/request";

import * as actionTypes from "./constants";

export const fetchHotSingerList = createAsyncThunk(
  actionTypes.GET_HOT_SINGER_LIST,
  async () => {
    const res = await getHotSingerListRequest(0);
    return res.artists;
  }
);

export const fetchMoreHotSingerList = createAsyncThunk(
  actionTypes.REFRESH_MORE_HOT_SINGER_LIST,
  async (params) => {
    const { pageCount = 0 } = params;
    const res = await getHotSingerListRequest(pageCount);
    return res.artists;
  }
);

export const fetchSingerList = createAsyncThunk(
  actionTypes.GET_SINGER_LIST,
  async (params) => {
    const { category, alpha, pageCount = 0 } = params;
    const res = await getSingerListRequest(category, alpha, pageCount);
    return res.artists;
  }
);

export const fetchMoreSingerList = createAsyncThunk(
  actionTypes.REFRESH_MORE_SINGER_LIST,
  async (params) => {
    const { category, alpha, pageCount = 0 } = params;
    const res = await getSingerListRequest(category, alpha, pageCount);
    return res.artists;
  }
);
