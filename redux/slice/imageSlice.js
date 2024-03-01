import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  options: [],
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    updateImageUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const { updateImageUrl } = imageSlice.actions;
export default imageSlice.reducer;
