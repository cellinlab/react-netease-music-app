import { createSlice } from "@reduxjs/toolkit";

import { fetchSingerInfo } from "./actionCreator";

const initialState = {
  artist: {},
  songsOfArtist: [],
  loading: true,
};

const singerSlice = createSlice({
  name: 'singer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingerInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingerInfo.fulfilled, (state, action) => {
        state.artist = action.payload.artist;
        state.songsOfArtist = action.payload.hotSongs;
        state.loading = false;
      });
  }
});

export const { } = singerSlice.actions;

export default singerSlice.reducer;
