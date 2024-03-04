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
  },
});

export const { toggleActiveAuthType } = userSlice.actions;
export default userSlice.reducer;
