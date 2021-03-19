import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchFriends from '../api';

export const fetchFriendsThunk = createAsyncThunk(
  'friends/fetch',
  fetchFriends,
);
