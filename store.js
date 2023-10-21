import photosListReducer from './reducers/photosListSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    photosList: photosListReducer,
  },
});