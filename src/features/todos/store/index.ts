import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types';
import {
  deleteTodoThunk,
  fetchTodosThunk,
  markTodoAsCompletedThunk,
} from './thunks';

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
  reducers: {
    deleteTodo: todosAdapter.removeOne,
  },
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
      })
      .addCase(deleteTodoThunk.pending, (state, action) => {
        todosAdapter.removeOne(state, action.meta.arg.id);
      })
      .addCase(deleteTodoThunk.rejected, (state, action) => {
        todosAdapter.addOne(state, action.meta.arg);
      })
      .addCase(markTodoAsCompletedThunk.pending, (state, action) => {
        todosAdapter.updateOne(state, {
          id: action.meta.arg.id,
          changes: { completed: true },
        });
      })
      .addCase(markTodoAsCompletedThunk.rejected, (state, action) => {
        todosAdapter.updateOne(state, {
          id: action.meta.arg.id,
          changes: { completed: false },
        });
      });
  },
});

export default todosSlice;
