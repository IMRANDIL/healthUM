import { createSlice } from "@reduxjs/toolkit";
export const allUserSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = allUserSlice.actions;
