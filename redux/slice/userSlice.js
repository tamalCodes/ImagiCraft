import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleActiveAuthType: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const { toggleActiveAuthType } = userSlice.actions;
export default userSlice.reducer;
