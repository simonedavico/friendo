import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchFriendsThunk } from '../store/thunks';
import { spacing, typography } from '../../../design';
import { Friend } from '../types';

interface FriendListItemProps {
  friend: Friend;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend }) => {
  return (
    <TouchableOpacity style={styles.friendListItem}>
      <Text>{friend.name}</Text>
    </TouchableOpacity>
  );
};

interface AllFriendsScreenProps {}

const AllFriendsScreen: React.FC<AllFriendsScreenProps> = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.friends.loading);
  const friends = useAppSelector((state) => state.friends.entities);

  React.useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, [dispatch]);

  return isLoading ? (
    <ActivityIndicator animating />
  ) : (
    <FlatList
      ListHeaderComponent={() => <Text style={styles.header}>Friends</Text>}
      data={Object.values(friends)}
      keyExtractor={(friend) => `${friend!.id}`}
      renderItem={({ item }) => <FriendListItem friend={item!} />}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: typography.text50,
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
