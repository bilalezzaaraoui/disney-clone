import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allMovies: [],
  recommended: null,
  newDisney: null,
  original: null,
  trending: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.recommended = action.payload.recommended;
      state.newDisney = action.payload.newDisney;
      state.original = action.payload.original;
      state.trending = action.payload.trending;
      state.allMovies = [
        ...action.payload.recommended,
        ...action.payload.newDisney,
        ...action.payload.original,
        ...action.payload.trending,
      ];
    },
  },
});

export const movieAction = movieSlice.actions;

export default movieSlice.reducer;
