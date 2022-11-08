import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import generalSlice from "./generalSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    general: generalSlice.reducer,
  }
})

export default store;

export const userActions = userSlice.actions;
export const generalActions = generalSlice.actions;