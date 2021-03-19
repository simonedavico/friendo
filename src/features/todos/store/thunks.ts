import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTodo, fetchTodos, completeTodo } from '../api';

export const fetchTodosThunk = createAsyncThunk('todos/fetch', fetchTodos);

export const deleteTodoThunk = createAsyncThunk('todos/delete', deleteTodo);

export const markTodoAsCompletedThunk = createAsyncThunk(
  'todos/complete',
  completeTodo,
);
