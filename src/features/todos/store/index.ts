import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types';
import {
  addTodoFulfilled,
  addTodoPending,
  addTodoRejected,
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
      })
      .addCase(addTodoPending, (state, action) => {
        todosAdapter.upsertOne(state, action.payload);
      })
      // TODO: tempId should be in action meta, not payload
      .addCase(addTodoFulfilled, (state, action) => {
        const { tempId, newTodo } = action.payload;
        todosAdapter.updateOne(state, {
          id: tempId,
          changes: { id: newTodo.id },
        });
      })
      .addCase(addTodoRejected, (state, action) => {
        todosAdapter.removeOne(state, action.payload.tempId);
      });
  },
});

export default todosSlice;
