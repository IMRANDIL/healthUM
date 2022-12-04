import { createSlice } from "@reduxjs/toolkit";
export const allDoctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: null,
  },
  reducers: {
    setDoctors: (state, action) => {
      state.doctors = action.payload;
    },
  },
});

export const { setDoctors } = allDoctorSlice.actions;
