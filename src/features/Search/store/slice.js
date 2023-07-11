import { createSlice } from "@reduxjs/toolkit";

import { fetchHotKeyWords, fetchSuggestList } from "./actionCreator";


const initialState = {
  hotList: [],
  suggestList: [],
  songsList: [],
  enterLoading: false
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeEnterLoading(state, action) {
      state.enterLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotKeyWords.fulfilled, (state, action) => {
        state.hotList = action.payload;
      })
      .addCase(fetchSuggestList.fulfilled, (state, action) => {
        state.suggestList = action.payload.suggests;
        state.songsList = action.payload.songs;
        state.enterLoading = false;
      });
  }
});

export const { changeEnterLoading } = searchSlice.actions;

export default searchSlice.reducer;
