import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos } from '../api';

export const fetchTodosThunk = createAsyncThunk('todos/fetch', fetchTodos);
