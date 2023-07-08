import { createSlice } from "@reduxjs/toolkit";

import { fetchBannerList, fetchRecommendList } from "./actionCreator";

const initialState = {
  recommendList: [],
  bannerList: [],
};

const recommendSlice = createSlice({
  name: "recommend",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerList.fulfilled, (state, action) => {
        state.bannerList = action.payload;
      })
      .addCase(fetchRecommendList.fulfilled, (state, action) => {
        state.recommendList = action.payload;
      });
  }
});

export default recommendSlice.reducer;
