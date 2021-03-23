import { createAction, createAsyncThunk, ThunkAction } from '@reduxjs/toolkit';
import { AppState } from '../../../store';
import { deleteTodo, fetchTodos, completeTodo, addTodo } from '../api';
import { Todo } from '../types';
import { selectIds } from './selectors';

export const fetchTodosThunk = createAsyncThunk('todos/fetch', fetchTodos);

export const deleteTodoThunk = createAsyncThunk('todos/delete', deleteTodo);

export const markTodoAsCompletedThunk = createAsyncThunk(
  'todos/complete',
  completeTodo,
);

const addTodoActionTypes = {
  pending: 'todos/add/pending',
  fulfilled: 'todos/add/fulfilled',
  rejected: 'todos/add/rejected',
};

export const addTodoPending = createAction<Todo>(addTodoActionTypes.pending);

export const addTodoFulfilled = createAction<{ newTodo: Todo; tempId: number }>(
  addTodoActionTypes.fulfilled,
);

export const addTodoRejected = createAction<{ error: Error; tempId: number }>(
  addTodoActionTypes.rejected,
);

type AddNewThunkAction =
  | ReturnType<typeof addTodoPending>
  | ReturnType<typeof addTodoFulfilled>
  | ReturnType<typeof addTodoRejected>;

export const addTodoThunk = ({
  todoText,
  friendId,
}: {
  todoText: string;
  friendId: number;
}): ThunkAction<
  Promise<Todo | Error>,
  AppState,
  unknown,
  AddNewThunkAction
> => async (dispatch, getState) => {
  const todosIds = selectIds(getState()) as number[];
  const tempId = Math.max(...todosIds) + 1;
  const tempTodo: Todo = {
    id: tempId,
    userId: friendId,
    completed: false,
    title: todoText,
  };

  // immediately add the todo, with a temporary id
  dispatch(addTodoPending(tempTodo));

  return addTodo({ friendId, todoText })
    .then((newTodo) => {
      // reconcile the temp todo with the proper id from the server
      dispatch(addTodoFulfilled({ newTodo, tempId }));
      return newTodo;
    })
    .catch((e: Error) => {
      dispatch(addTodoRejected({ error: e, tempId }));
      // we do not rethrow, like thunks created by createAsyncThunk
      return e;
    });
};
