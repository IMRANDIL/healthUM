import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertSlice } from "./alertsSlice";

const rooteReducer = combineReducers({
  alerts: alertSlice.reducer,
});

const store = configureStore({
  reducer: rooteReducer,
});

export default store;
