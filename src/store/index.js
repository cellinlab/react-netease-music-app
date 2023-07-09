import { configureStore } from '@reduxjs/toolkit'

import recommendSlice from '@/features/Recommend/store/slice';
import singersSlice from '@/features/Singers/store/slice';
import rankSlice from '@/features/Rank/store/slice';

const store = configureStore({
  reducer: {
    recommend: recommendSlice,
    singers: singersSlice,
    rank: rankSlice,
  },
});

export default store;
