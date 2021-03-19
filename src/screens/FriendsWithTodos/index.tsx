import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllFriendsScreen from './AllFriendsScreen';
import TodosForFriendScreen from './TodosForFriendScreen';
import { FriendsWithTodosStackParamList } from './types';

const Stack = createStackNavigator<FriendsWithTodosStackParamList>();

const FriendsWithTodos: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AllFriends">
      <Stack.Screen name="AllFriends" component={AllFriendsScreen} />
      <Stack.Screen name="TodosForFriend" component={TodosForFriendScreen} />
    </Stack.Navigator>
  );
};

export default FriendsWithTodos;
