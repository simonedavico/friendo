import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import { FriendsWithTodosStackParamList } from './types';

type TodosForFriendScreenNavigationProp = StackNavigationProp<
  FriendsWithTodosStackParamList,
  'TodosForFriend'
>;

interface TodosForFriendScreenProps {
  navigation: TodosForFriendScreenNavigationProp;
}

const TodosForFriendScreen: React.FC<TodosForFriendScreenProps> = () => {
  return (
    <View>
      <Text>Todos for friend</Text>
    </View>
  );
};

export default TodosForFriendScreen;
