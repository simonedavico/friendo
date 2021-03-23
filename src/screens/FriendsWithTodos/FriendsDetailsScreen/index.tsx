import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppList } from '../../../design/AppList';
import { selectById } from '../../../features/friends/store/selectors';
import { selectForFriend } from '../../../features/todos/store/selectors';
import {
  addTodoThunk,
  deleteTodoThunk,
  markTodoAsCompletedThunk,
} from '../../../features/todos/store/thunks';
import { Todo } from '../../../features/todos/types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { FriendsWithTodosStackParamList } from '../types';
import AddTodoModal from './AddTodoModal';
import FriendsDetailsHeader from './FriendsDetailsHeader';
import TodoListItem from './TodoListItem';

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
  const [snackbar, setShowSnackbar] = React.useState<{
    shown: boolean;
    message: string;
  }>({ shown: false, message: '' });

  const dispatch = useAppDispatch();

  const deleteTodo = (todo: Todo) => {
    dispatch(deleteTodoThunk(todo)).then(() => {
      setShowSnackbar({ shown: true, message: 'Yay, one less thing to do!' });
    });
  };

  const completeTodo = (todo: Todo) => {
    dispatch(markTodoAsCompletedThunk(todo)).then(() => {
      setShowSnackbar({ shown: true, message: 'Phew, done!' });
    });
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
        testID="todo-list"
        // avoid having the last list item covered by the bottom safe area inset
        ListFooterComponent={() => <View style={{ height: bottom }} />}
        ListHeaderComponent={() => (
          <FriendsDetailsHeader
            friend={friend}
            onTodoAdd={() => setShowAddTodo(true)}
          />
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
          dispatch(addTodoThunk({ todoText, friendId })).then(() => {
            setShowSnackbar({
              shown: true,
              message: 'Todo created successfully!',
            });
          });
        }}
      />
      {/* TODO: we could set one snackbar higher in the component tree to activate through a dedicated provider */}
      <Snackbar
        duration={Snackbar.DURATION_MEDIUM}
        visible={snackbar.shown}
        onDismiss={() => {
          setShowSnackbar({ shown: false, message: '' });
        }}
        action={{
          label: 'Cool',
          onPress: () => {},
        }}>
        {snackbar.message}
      </Snackbar>
    </>
  );
};

export const navigationOptions: StackNavigationOptions = {
  headerTitle: () => null,
};

export default FriendDetailsScreen;
