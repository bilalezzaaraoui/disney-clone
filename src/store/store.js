import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice/userSlice";
import MovieReducer from "./movieSlice/movieSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
    movie: MovieReducer,
  },
});

export default store;
