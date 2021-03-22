import * as React from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddTodoModal from './AddTodoModal';
import { AppList } from '../../../design/AppList';
import TodoListItem from './TodoListItem';
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
import FriendsDetailsHeader from './FriendsDetailsHeader';

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
          dispatch(addTodoThunk({ todoText, friendId }));
        }}
      />
    </>
  );
};

export const navigationOptions: StackNavigationOptions = {
  headerTitle: () => null,
};

export default FriendDetailsScreen;
