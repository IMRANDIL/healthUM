import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertSlice } from "./alertsSlice";
import { userSlice } from "./usersSlice";

const rooteReducer = combineReducers({
  alerts: alertSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: rooteReducer,
});

export default store;
