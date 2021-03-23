import { createSlice } from '@reduxjs/toolkit';
import { GeolocationPositionError, GeolocationState } from '../types';
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
      })
      .addCase(geolocationThunk.rejected, (state, action) => {
        state.loading = false;
        state.status = action.error.message as GeolocationPositionError;
      });
  },
});

export default geolocationSlice;
