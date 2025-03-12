import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../Slices/ProfileSlice";
import searchReducer from "../Slices/SearchSlice";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    search: searchReducer,
  },
});
