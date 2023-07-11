import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest
} from "@/api/request";

import * as actionTypes from "./constants";

export const fetchHotKeyWords = createAsyncThunk(
  actionTypes.CHANGE_HOT_KEYWRODS,
  async () => {
    const res = await getHotKeyWordsRequest();
    return res.result.hots;
  }
);

export const fetchSuggestList = createAsyncThunk(
  actionTypes.CHANGE_SUGGEST_LIST,
  async (query) => {
    const res1 = await getSuggestListRequest(query);
    const res2 = await getResultSongsListRequest(query);

    const suggests = res1.result || [];
    const songs = res2.result.songs || [];

    return { suggests, songs };
  }
);
