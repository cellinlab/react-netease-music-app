import { configureStore } from '@reduxjs/toolkit'

import recommendSlice from '@/features/Recommend/store/slice';
import singersSlice from '@/features/Singers/store/slice';
import rankSlice from '@/features/Rank/store/slice';
import albumSlice from '@/features/Album/store/slice';
import singerSlic from '@/features/Singer/store/slice';
import playerSlice from '@/features/Player/store/slice';

const store = configureStore({
  reducer: {
    recommend: recommendSlice,
    singers: singersSlice,
    rank: rankSlice,
    album: albumSlice,
    singer: singerSlic,
    player: playerSlice,
  },
});

export default store;
