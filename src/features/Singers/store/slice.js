import { createSlice } from "@reduxjs/toolkit";

import {
  fetchHotSingerList,
  fetchMoreHotSingerList,
  fetchSingerList,
  fetchMoreSingerList
} from "./actionCreator";

const initialState = {
  singerList: [],
  enterLoading: true,
  pullUpLoading: false,
  pullDownLoading: false,
  pageCount: 0
};

const singersSlice = createSlice({
  name: "singers",
  initialState,
  reducers: {
    changeSingerList(state, action) {
      state.singerList = action.payload;
    },
    changePageCount(state, action) {
      state.pageCount = action.payload;
    },
    changeEnterLoading(state, action) {
      state.enterLoading = action.payload;
    },
    changePullUpLoading(state, action) {
      state.pullUpLoading = action.payload;
    },
    changePullDownLoading(state, action) {
      state.pullDownLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotSingerList.fulfilled, (state, action) => {
        state.singerList = action.payload;
        state.enterLoading = false;
        state.pullDownLoading = false;
      })
      .addCase(fetchMoreHotSingerList.fulfilled, (state, action) => {
        state.singerList = [...state.singerList, ...action.payload];
        state.pullUpLoading = false;
      })
      .addCase(fetchSingerList.fulfilled, (state, action) => {
        state.singerList = action.payload;
        state.enterLoading = false;
        state.pullDownLoading = false;
      })
      .addCase(fetchMoreSingerList.fulfilled, (state, action) => {
        state.singerList = [...state.singerList, ...action.payload];
        state.pullUpLoading = false;
      });
  }
});

export default singersSlice.reducer;

export const {
  changeSingerList,
  changePageCount,
  changeEnterLoading,
  changePullUpLoading,
  changePullDownLoading
} = singersSlice.actions;
