import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { selectFriends } from '../../features/friends/store/selectors';
import { fetchFriendsThunk } from '../../features/friends/store/thunks';
import { Friend, FriendWithDistance } from '../../features/friends/types';
import { geolocationThunk } from '../../features/geolocation/store/thunks';
import { fetchTodosThunk } from '../../features/todos/store/thunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Title from '../../components/Title';
import { spacing } from '../../design';
import intl from '../../intl';
import { FriendsWithTodosStackParamList } from './types';

interface FriendListItemProps {
  friend: FriendWithDistance;
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
      {friend.distanceInKm !== undefined ? (
        <Text>
          is {intl.formatNumber(friend.distanceInKm, { unit: 'kilometers' })}{' '}
          away
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

const AllFriendsScreen: React.FC<AllFriendsScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const isLoadingFriends = useAppSelector((state) => state.friends.loading);
  const isLoadingGeolocation = useAppSelector(
    (state) => state.geolocation.loading,
  );
  const friends = useAppSelector(selectFriends);

  const onFriendPress = React.useCallback(
    (friend: Friend) => {
      navigation.navigate('TodosForFriend', { friendId: friend.id });
    },
    [navigation],
  );

  React.useEffect(() => {
    dispatch(geolocationThunk());
    dispatch(fetchFriendsThunk());
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  return isLoadingFriends || isLoadingGeolocation ? (
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
