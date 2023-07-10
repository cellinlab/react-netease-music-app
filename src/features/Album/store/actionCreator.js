import { createAsyncThunk } from "@reduxjs/toolkit";

import * as actionTypes from "./constants";
import { getAlbumDetailRequest } from "@/api/request";

export const fetchAlbumDetail = createAsyncThunk(
  actionTypes.CHANGE_CURRENT_ALBUM,
  async (id) => {
    const res = await getAlbumDetailRequest(id);
    return res.playlist;
  }
);