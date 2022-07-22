import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCharacters = createAsyncThunk(
  "charactersSlice/getCharacters",
  async () => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/characters/`
    );
    return res.data;
  }
);

export const fetchCharacterDetail = createAsyncThunk(
  "detailSlice/getCharacterDetail",
  async (getCharDetailId) => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/characters/${getCharDetailId}`
    );
    return res.data;
  }
);

export const charactersSlice = createSlice({
  name: "charactersSlice",
  initialState: {
    allCharacters: [],
    charDetail: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: {
    [fetchCharacters.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchCharacters.fulfilled]: (state, action) => {
      state.allCharacters = action.payload;
      state.isLoading = false;
    },
    [fetchCharacters.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },

    [fetchCharacterDetail.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchCharacterDetail.fulfilled]: (state, action) => {
      state.charDetail = action.payload;
      state.isLoading = false;
    },
    [fetchCharacterDetail.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export default charactersSlice.reducer;
