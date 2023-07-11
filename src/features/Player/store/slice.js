import { createSlice } from "@reduxjs/toolkit";

import { playMode } from "@/config";
import { findIndex } from "@/utils";

import { getSongDetail } from "./actionCreator";

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
    },
    deleteSong(state, action) {
      const playList = state.playList.slice();
      const sequenceList = state.sequencePlayList.slice();
      let currentIndex = state.currentIndex;

      const fpIndex = findIndex(action.payload, playList);
      playList.splice(fpIndex, 1);
      if (fpIndex < currentIndex) currentIndex--;

      const fsIndex = findIndex(action.payload, sequenceList);
      sequenceList.splice(fsIndex, 1);

      state.playList = playList;
      state.sequencePlayList = sequenceList;
      state.currentIndex = currentIndex;
    },
    clearState(state, action) {
      state = initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSongDetail.fulfilled, (state, action) => {
        const playList = state.playList.slice();
        const sequenceList = state.sequencePlayList.slice();
        let currentIndex = state.currentIndex;

        const song = action.payload;

        const fpIndex = findIndex(song, playList);
        if (fpIndex === currentIndex && currentIndex !== -1) return;
        currentIndex++;

        playList.splice(currentIndex, 0, song);

        if (fpIndex > -1) {
          if (currentIndex > fpIndex) {
            playList.splice(fpIndex, 1);
            currentIndex--;
          } else {
            playList.splice(fpIndex + 1, 1);
          }
        }

        const sequenceIndex = findIndex(playList[currentIndex], sequenceList) + 1;
        const fsIndex = findIndex(song, sequenceList);

        sequenceList.splice(sequenceIndex, 0, song);
        if (fsIndex > -1) {
          if (sequenceIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1);
            currentIndex--;
          } else {
            sequenceList.splice(fsIndex + 1, 1);
          }
        }

        state.playList = playList;
        state.sequencePlayList = sequenceList;
        state.currentIndex = currentIndex;
      });
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
  changeCurrentSong,
  deleteSong,
  clearState
} = playerSlice.actions;

export default playerSlice.reducer;
