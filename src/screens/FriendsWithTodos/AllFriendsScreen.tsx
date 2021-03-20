import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { spacing } from '../../design';
import { fetchFriendsThunk } from '../../features/friends/store/thunks';
import { Friend } from '../../features/friends/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FriendsWithTodosStackParamList } from './types';
import { fetchTodosThunk } from '../../features/todos/store/thunks';
import Title from '../../components/Title';

interface FriendListItemProps {
  friend: Friend;
  onPress: (friend: Friend) => void;
}

type AllFriendsScreenNavigationProps = StackNavigationProp<
  FriendsWithTodosStackParamList,
  'AllFriends'
>;

interface AllFriendsScreenProps {
  navigation: AllFriendsScreenNavigationProps;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.friendListItem}
      onPress={() => onPress(friend)}>
      <Text>{friend.name}</Text>
    </TouchableOpacity>
  );
};

const AllFriendsScreen: React.FC<AllFriendsScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.friends.loading);
  const friends = useAppSelector((state) => state.friends.entities);

  const onFriendPress = React.useCallback(
    (friend: Friend) => {
      navigation.navigate('TodosForFriend', { friendId: friend.id });
    },
    [navigation],
  );

  React.useEffect(() => {
    dispatch(fetchFriendsThunk());
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  return isLoading ? (
    <ActivityIndicator animating />
  ) : (
    <FlatList
      ListHeaderComponent={() => <Title style={styles.header}>Friends</Title>}
      data={Object.values(friends)}
      keyExtractor={(friend) => `${friend!.id}`}
      initialNumToRender={20}
      renderItem={({ item }) => (
        <FriendListItem friend={item!} onPress={onFriendPress} />
      )}
    />
  );
};

export const navigationOptions = {
  title: 'Friends',
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.s2,
  },
  friendListItem: {
    paddingHorizontal: spacing.s2,
    paddingVertical: spacing.s5,
    borderBottomWidth: 1,
  },
});

export default AllFriendsScreen;
