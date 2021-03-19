import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTodo, fetchTodos } from '../api';

export const fetchTodosThunk = createAsyncThunk('todos/fetch', fetchTodos);

export const deleteTodoThunk = createAsyncThunk('todos/delete', deleteTodo);
