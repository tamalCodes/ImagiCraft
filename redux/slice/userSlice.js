"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleActiveAuthType: (state, action) => {
      state.isLoggedIn = action.payload;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { toggleActiveAuthType, updateUser } = userSlice.actions;
export default userSlice.reducer;
