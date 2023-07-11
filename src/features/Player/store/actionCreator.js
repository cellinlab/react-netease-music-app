import { createAsyncThunk } from "@reduxjs/toolkit";

import { getSongDetailRequest } from "@/api/request";

import * as actionTypes from "./constants";

export const getSongDetail = createAsyncThunk(
  actionTypes.INSERT_SONG,
  async (id) => {
    const res = await getSongDetailRequest(id);
    return res.songs[0];
  }
);
