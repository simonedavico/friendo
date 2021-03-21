import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import * as React from 'react';
import { FlatList, Linking, StyleSheet, Text, View } from 'react-native';
import AddTodoModal from '../../components/AddTodoModal';
import Button from '../../components/Button';
import Title from '../../components/Title';
import { spacing } from '../../design';
import { selectById } from '../../features/friends/store/selectors';
import { selectForFriend } from '../../features/todos/store/selectors';
import {
  addTodoThunk,
  deleteTodoThunk,
  markTodoAsCompletedThunk,
} from '../../features/todos/store/thunks';
import { Todo } from '../../features/todos/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FriendsWithTodosStackParamList } from './types';

type FriendDetailsScreenNavigationProp = StackNavigationProp<
  FriendsWithTodosStackParamList,
  'TodosForFriend'
>;

type FriendDetailsScreenRouteProp = RouteProp<
  FriendsWithTodosStackParamList,
  'TodosForFriend'
>;

interface FriendDetailsScreen {
  navigation: FriendDetailsScreenNavigationProp;
  route: FriendDetailsScreenRouteProp;
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
      <Button onPress={() => onComplete(todo)}>
        <Text>Done</Text>
      </Button>
      <Button onPress={() => onDelete(todo)}>
        <Text>Delete</Text>
      </Button>
    </View>
  );
};

const FriendDetailsScreen: React.FC<FriendDetailsScreen> = ({ route }) => {
  const friendId = route.params.friendId;
  const friend = useAppSelector((state) => selectById(state, friendId));
  const todos = useAppSelector(selectForFriend(friendId));
  const [showAddTodo, setShowAddTodo] = React.useState(false);
  const dispatch = useAppDispatch();

  const deleteTodo = (todo: Todo) => {
    dispatch(deleteTodoThunk(todo));
  };

  const completeTodo = (todo: Todo) => {
    dispatch(markTodoAsCompletedThunk(todo));
  };

  if (!friend) {
    return (
      // TODO: style
      <View>
        <Text>Whoops, friend not found!</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        ListHeaderComponent={() => (
          <View>
            <Title style={styles.header}>{friend.name}</Title>
            <Text style={{ paddingHorizontal: spacing.s2 }}>
              {friend.address.city}, {friend.address.street}
            </Text>
            <View style={styles.headerButtons}>
              <Button
                onPress={() => {
                  setShowAddTodo(true);
                }}
                style={styles.button}>
                <Text>Add Todo</Text>
              </Button>
              <Button
                onPress={() => {
                  Linking.openURL(`tel:${friend.phone}`);
                }}
                style={styles.button}>
                <Text>Call</Text>
              </Button>
              <Button>
                <Text>Maps</Text>
              </Button>
            </View>
          </View>
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
  button: {
    marginRight: spacing.s2,
  },
  header: {
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.s2,
  },
  headerButtons: {
    flexDirection: 'row',
    margin: spacing.s2,
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

export default FriendDetailsScreen;
