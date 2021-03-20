import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import * as React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import AddTodoModal from '../../components/AddTodoModal';
import Title from '../../components/Title';
import { spacing } from '../../design';
import { selectForFriend } from '../../features/todos/store/selectors';
import {
  addTodoThunk,
  deleteTodoThunk,
  markTodoAsCompletedThunk,
} from '../../features/todos/store/thunks';
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
  onComplete: (todo: Todo) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  onDelete,
  onComplete,
}) => {
  return (
    <View style={styles.todosListItem}>
      <View style={styles.todoTitle}>
        <Text>{todo.title}</Text>
        <Text>{todo.completed ? 'Done' : 'Todo'}</Text>
      </View>
      <Button onPress={() => onComplete(todo)} title="Done" />
      <Button onPress={() => onDelete(todo)} title="Delete" />
    </View>
  );
};

const TodosForFriendScreen: React.FC<TodosForFriendScreenProps> = ({
  navigation,
  route,
}) => {
  const friendId = route.params.friendId;

  const deleteTodo = (todo: Todo) => {
    dispatch(deleteTodoThunk(todo));
  };

  const completeTodo = (todo: Todo) => {
    dispatch(markTodoAsCompletedThunk(todo));
  };

  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectForFriend(friendId));
  const [showAddTodo, setShowAddTodo] = React.useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add Todo"
          onPress={() => {
            setShowAddTodo(true);
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <>
      <FlatList
        ListHeaderComponent={() => (
          <Title style={styles.header}>Todos for friend</Title>
        )}
        data={todos}
        keyExtractor={({ id }) => `${id}`}
        renderItem={({ item }) => (
          <TodoListItem
            todo={item}
            onDelete={deleteTodo}
            onComplete={completeTodo}
          />
        )}
      />
      <AddTodoModal
        isVisible={showAddTodo}
        onModalHide={() => {
          setShowAddTodo(false);
        }}
        onSave={async (todoText) => {
          dispatch(addTodoThunk({ todoText, friendId }));
        }}
      />
    </>
  );
};

export const navigationOptions: StackNavigationOptions = {
  headerTitle: () => null,
};

const styles = StyleSheet.create({
  header: {
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
