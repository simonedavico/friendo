import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllFriendsScreen, {
  navigationOptions as friendsNavOptions,
} from './AllFriendsScreen';
import TodosForFriendScreen, {
  navigationOptions as todosNavOptions,
} from './TodosForFriendScreen';
import { FriendsWithTodosStackParamList } from './types';

const Stack = createStackNavigator<FriendsWithTodosStackParamList>();

const FriendsWithTodos: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AllFriends">
      <Stack.Screen
        name="AllFriends"
        options={friendsNavOptions}
        component={AllFriendsScreen}
      />
      <Stack.Screen
        name="TodosForFriend"
        component={TodosForFriendScreen}
        options={todosNavOptions}
      />
    </Stack.Navigator>
  );
};

export default FriendsWithTodos;
