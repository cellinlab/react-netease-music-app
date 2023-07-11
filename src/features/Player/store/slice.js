import { createSlice } from "@reduxjs/toolkit";

import { playMode } from "@/config";

const initialState = {
  fullScreen: false,
  playing: false,
  sequencePlayList: [],
  playList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  showPlayList: false,
  currentSong: {}
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    changeFullScreen(state, action) {
      state.fullScreen = action.payload;
    },
    changePlayingState(state, action) {
      state.playing = action.payload;
    },
    changeSequencePlayList(state, action) {
      state.sequencePlayList = action.payload;
    },
    changePlayList(state, action) {
      state.playList = action.payload;
    },
    changePlayMode(state, action) {
      state.mode = action.payload;
    },
    changeCurrentIndex(state, action) {
      state.currentIndex = action.payload;
    },
    changeShowPlayList(state, action) {
      state.showPlayList = action.payload;
    },
    changeCurrentSong(state, action) {
      state.currentSong = action.payload;
    }
  }
});

export const {
  changeFullScreen,
  changePlayingState,
  changeSequencePlayList,
  changePlayList,
  changePlayMode,
  changeCurrentIndex,
  changeShowPlayList,
  changeCurrentSong
} = playerSlice.actions;

export default playerSlice.reducer;
