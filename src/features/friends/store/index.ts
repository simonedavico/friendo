import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Friend } from '../types';
import { fetchFriendsThunk } from './thunks';

const friendsAdapter = createEntityAdapter<Friend>();

const initialState = friendsAdapter.getInitialState<{
  loading: boolean;
  error: string | null;
}>({
  loading: false,
  error: null,
});

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFriendsThunk.fulfilled, (state, action) => {
        state.loading = false;
        friendsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchFriendsThunk.rejected, (state) => {
        state.loading = false;
        // TODO: handle error
      });
  },
});

export default friendsSlice;
