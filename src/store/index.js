import { configureStore } from '@reduxjs/toolkit'

import recommendSlice from '@/features/Recommend/store/slice';

const store = configureStore({
  reducer: {
    recommend: recommendSlice,
  },
});

export default store;
