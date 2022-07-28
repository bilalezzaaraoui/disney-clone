import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice/userSlice";

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default store;
