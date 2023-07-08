import { createSlice } from "@reduxjs/toolkit";

import { fetchBannerList, fetchRecommendList, changeEnterLoading } from "./actionCreator";

const initialState = {
  recommendList: [],
  bannerList: [],
  enterLoading: true
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
        state.enterLoading = false;
      })
      .addCase(changeEnterLoading, (state, action) => {
        state.enterLoading = action.payload;
      });
  }
});

export default recommendSlice.reducer;
