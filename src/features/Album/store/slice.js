import { createSlice } from "@reduxjs/toolkit";

import { fetchAlbumDetail } from "./actionCreator";

const initialState = {
  currentAlbum: {},
  enterLoading: true
};

const albumSlice = createSlice({
  name: "album",
  initialState,
  reducers: {
    changeLoading(state, action) {
      state.enterLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumDetail.fulfilled, (state, action) => {
        state.currentAlbum = action.payload;
        state.enterLoading = false;
      });
  }
});

export const { changeLoading } = albumSlice.actions;

export default albumSlice.reducer;
