import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types';
import { fetchTodosThunk } from './thunks';

export const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState<{
  loading: boolean;
  error: string | null;
}>({
  loading: false,
  error: null,
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.loading = false;
        todosAdapter.setAll(state, action.payload);
      })
      .addCase(fetchTodosThunk.rejected, (state) => {
        state.loading = false;
        // TODO: handle error
      });
  },
});

export default todosSlice;
