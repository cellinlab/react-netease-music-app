import { createAsyncThunk } from "@reduxjs/toolkit";

import { getSingerInfoRequest } from '@/api/request';
import * as actionTypes from './constants';


export const fetchSingerInfo = createAsyncThunk(
  actionTypes.FETCH_SINGER_INFO,
  async (id) => {
    const res = await getSingerInfoRequest(id);
    return res;
  }
);
