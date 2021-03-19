import { createSlice } from '@reduxjs/toolkit';
import { Friend } from '../types';
import { fetchFriendsThunk } from './thunks';

type FriendsState = {
  ids: number[];
  byId: Record<number, Friend>;
  loading: boolean;
  error: string | null;
};

const initialState: FriendsState = {
  ids: [],
  byId: {},
  loading: false,
  error: null,
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFriendsThunk.fulfilled, (state) => {
        state.loading = false;
        state.byId = {};
        state.ids = [];
      })
      .addCase(fetchFriendsThunk.rejected, (state) => {
        state.loading = false;
        // TODO: handle error
      });
  },
});

export default friendsSlice;
