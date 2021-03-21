import { createSlice } from '@reduxjs/toolkit';
import { GeolocationState } from '../types';
import { geolocationThunk } from './thunks';

const initialState = {
  status: 'UNASKED' as const,
  loading: false,
};

const geolocationSlice = createSlice<
  GeolocationState & { loading: boolean },
  {},
  'geolocation'
>({
  name: 'geolocation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(geolocationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(geolocationThunk.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          loading: false,
        };
      });
  },
});

export default geolocationSlice;
