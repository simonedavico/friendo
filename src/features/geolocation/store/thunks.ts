import { createAsyncThunk } from '@reduxjs/toolkit';
import { findUserLocation } from '../api';

export const geolocationThunk = createAsyncThunk(
  'geolocation/ask',
  findUserLocation,
);
