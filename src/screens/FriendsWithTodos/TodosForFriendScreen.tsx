import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { spacing, typography } from '../../design';
import { selectForFriend } from '../../features/todos/store/selectors';
import { useAppSelector } from '../../store/hooks';
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

const TodosForFriendScreen: React.FC<TodosForFriendScreenProps> = ({
  route,
}) => {
  const friendId = route.params.friendId;
  const todos = useAppSelector(selectForFriend(friendId));

  return (
    <FlatList
      ListHeaderComponent={() => (
        <Text style={styles.header}>Todos for friend</Text>
      )}
      data={todos}
      keyExtractor={({ id }) => `${id}`}
      renderItem={({ item }) => (
        <View style={styles.todosList}>
          <Text>{item.title}</Text>
        </View>
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
  todosList: {
    paddingHorizontal: spacing.s2,
    paddingVertical: spacing.s5,
    borderBottomWidth: 1,
  },
});

export default TodosForFriendScreen;
