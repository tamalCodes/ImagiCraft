import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  filters: {
    brightness: { value: 100 },
    grayscale: { value: 0 },
    saturate: { value: 100 },
    contrast: { value: 100 },
  },
  activeFilter: {},
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    updateImageUrl: (state, action) => {
      state.url = action.payload;
    },

    setActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },

    updateImageFilters: (state, action) => {
      const { filterName, value } = action.payload;
      state.filters[filterName] = { value };
    },

    resetImageFilters: (state) => {
      state.filters = initialState.filters;
      state.activeFilter = {};
    },
  },
});

export const {
  updateImageUrl,
  resetImageFilters,
  setActiveFilter,
  updateImageFilters,
} = imageSlice.actions;
export default imageSlice.reducer;
