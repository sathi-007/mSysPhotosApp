import {   FETCH_PHOTOS_LIST, FETCH_PHOTOS_LIST_ERROR, FETCH_PHOTOS_LIST_SUCCESS } from "../constants";
import { createSlice } from "@reduxjs/toolkit"
import { fetchPhotosList } from "../thunk/fetchPhotosListThunk";
// import Realm from 'realm';
// import Photo from "../db/models/photo";

const initialPhotosListState = {
    photos: [],
    loading: false,
    error: false,
};

const PhotosListSlice = createSlice({
  name: "photosList",
  initialState: initialPhotosListState,
  reducers: {
  },
  extraReducers:{
        [fetchPhotosList.pending]:(state, action) => {
        state.loading = true;
        state.error = false;
      },
      [fetchPhotosList.fulfilled]: (state, action) => {
        state.loading = false;
        state.photos = action.payload.photos.photo;
        state.error = false;
      },
      [fetchPhotosList.rejected]: (state, action) => {
          state.loading = false;
          state.error = true;
        }
  }
})

export default PhotosListSlice.reducer;