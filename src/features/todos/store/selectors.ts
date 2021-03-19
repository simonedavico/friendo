import { createSelector } from 'reselect';
import { AppState } from '../../../store';
import { todosAdapter } from './index';

const { selectAll } = todosAdapter.getSelectors<AppState>(
  (state) => state.todos,
);

export const selectForFriend = (friendId: number) =>
  createSelector(selectAll, (todos) =>
    todos.filter((t) => t.userId === friendId),
  );
