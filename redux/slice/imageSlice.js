import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  filters: {
    brightness: 100,
    grayscale: 0,
    saturate: 100,
    contrast: 100,
    rotate: 0,
  },

  textOverlay: false,
  textOverlayOptions: {
    top: 50,
    left: 50,
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: 18,
    bold: false,
    italic: false,
    color: "#fff",
    value: "Hello",
  },
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    updateImageUrl: (state, action) => {
      state.url = action.payload;
    },

    updateImageFilters: (state, action) => {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
    },

    resetImageOptions: (state) => {
      state.filters = initialState.filters;
      state.textOverlay = initialState.textOverlay;
      state.textOverlayOptions = initialState.textOverlayOptions;
      state.rotate = initialState.rotate;
    },

    toggleTextOverlay: (state) => {
      state.textOverlay = !state.textOverlay;
    },

    updateTextoverlayFilters: (state, action) => {
      const { filterName, value } = action.payload;
      state.textOverlayOptions[filterName] = value;
    },
  },
});

export const {
  updateImageUrl,
  resetImageOptions,
  updateImageFilters,
  toggleTextOverlay,
  updateTextoverlayFilters,
} = imageSlice.actions;
export default imageSlice.reducer;
