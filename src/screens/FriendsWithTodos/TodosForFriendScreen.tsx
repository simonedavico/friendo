import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '../../design';
import { selectForFriend } from '../../features/todos/store/selectors';
import { deleteTodoThunk } from '../../features/todos/store/thunks';
import { Todo } from '../../features/todos/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FriendsWithTodosStackParamList } from './types';

type TodosForFriendScreenNavigationProp = StackNavigationProp<
  FriendsWithTodosStackParamList,
  'TodosForFriend'
>;

type TodosForFriendScreenRouteProp = RouteProp<
  FriendsWithTodosStackParamList,
  'TodosForFriend'
>;

interface TodosForFriendScreenProps {
  navigation: TodosForFriendScreenNavigationProp;
  route: TodosForFriendScreenRouteProp;
}

interface TodoListItemProps {
  todo: Todo;
  onDelete: (todo: Todo) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ todo, onDelete }) => {
  return (
    <View style={styles.todosListItem}>
      <Text style={styles.todoTitle}>{todo.title}</Text>
      <Button onPress={() => onDelete(todo)} title="Delete" />
    </View>
  );
};

const TodosForFriendScreen: React.FC<TodosForFriendScreenProps> = ({
  route,
}) => {
  const friendId = route.params.friendId;
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectForFriend(friendId));

  const deleteTodo = (todo: Todo) => {
    dispatch(deleteTodoThunk(todo));
  };

  return (
    <FlatList
      ListHeaderComponent={() => (
        <Text style={styles.header}>Todos for friend</Text>
      )}
      data={todos}
      keyExtractor={({ id }) => `${id}`}
      renderItem={({ item }) => (
        <TodoListItem todo={item} onDelete={deleteTodo} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: typography.text50,
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.s2,
  },
  todosListItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.s2,
    paddingVertical: spacing.s5,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  todoTitle: { flex: 1 },
});

export default TodosForFriendScreen;
