import { createAsyncThunk } from "@reduxjs/toolkit";

import { getRankListRequest } from "@/api/request";

import * as actionTypes from "./constants";

export const fetchRankList = createAsyncThunk(
  actionTypes.CHANGE_RANK_LIST,
  async () => {
    const res = await getRankListRequest();
    return res.list;
  }
);
