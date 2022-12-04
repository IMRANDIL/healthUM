import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { alertSlice } from "./alertsSlice";
import { userSlice } from "./usersSlice";
import {allUserSlice} from './allUsersSlice';
import { allDoctorSlice } from "./allDoctorsSlice";

const rooteReducer = combineReducers({
  alerts: alertSlice.reducer,
  user: userSlice.reducer,
  users: allUserSlice.reducer,
  doctors: allDoctorSlice.reducer

});

const store = configureStore({
  reducer: rooteReducer,
});

export default store;
