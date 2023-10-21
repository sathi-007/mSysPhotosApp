import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPhotosListAPI } from "../api/fetchPhotosList";
import { FETCH_PHOTOS_LIST } from "../constants";


export const fetchPhotosList = createAsyncThunk(FETCH_PHOTOS_LIST, async () => {
    const response = await fetchPhotosListAPI();
    return response.data;
  });