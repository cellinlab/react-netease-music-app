import { createSlice } from "@reduxjs/toolkit";

import { fetchRankList } from './actionCreator';

const initialState = {
  rankList: [],
  loading: true
};

const rankSlice = createSlice({
  name: "rank",
  initialState,
  reducers: {
    changeLoading(state, action) {
      state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRankList.fulfilled, (state, action) => {
        state.rankList = action.payload;
        state.loading = false;
      });
  }
});

export const { changeLoading } = rankSlice.actions;

export default rankSlice.reducer;
