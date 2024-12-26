// carSlice.js
import { createSlice } from "@reduxjs/toolkit";

const carSlice = createSlice({
  name: "car",
  initialState: {
    car_brand: "",
    car_name: "",
    car_slogan: "",
    // Images for step 2
    mockup: null,
    car_banner: null,
    car_porche: null,
    exteriorImages: [],
    interiorImages: [],
    galleryImages: [],
  },
  reducers: {
    setCarData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setExteriorImages: (state, action) => {
      state.exteriorImages = action.payload;
    },
    setInteriorImages: (state, action) => {
      state.interiorImages = action.payload;
    },
    setGalleryImages: (state, action) => {
      state.galleryImages = action.payload;
    },
  },
});

export const {
  setCarData,
  setExteriorImages,
  setInteriorImages,
  setGalleryImages,
} = carSlice.actions;
export const selectCarData = (state) => state.car;
export default carSlice.reducer;
