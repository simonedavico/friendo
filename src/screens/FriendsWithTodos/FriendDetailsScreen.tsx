import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import * as React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddTodoModal from '../../components/AddTodoModal';
import { AppList } from '../../components/AppList';
import Button from '../../components/Button';
import ListTitle from '../../components/ListTitle';
import TodoListItem from '../../components/TodoListItem';
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

const FriendDetailsScreen: React.FC<FriendDetailsScreen> = ({ route }) => {
  const { bottom } = useSafeAreaInsets();
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
      <AppList
        ListFooterComponent={() => <View style={{ height: bottom }} />}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <ListTitle>{friend.name}</ListTitle>
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
    marginBottom: spacing.s6,
    marginTop: spacing.s3,
    paddingHorizontal: spacing.s3,
  },
  headerButtons: {
    flexDirection: 'row',
    margin: spacing.s2,
  },
});

export default FriendDetailsScreen;
