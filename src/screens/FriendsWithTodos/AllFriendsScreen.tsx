import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { AppList } from '../../components/AppList';
import FriendListItem from '../../components/FriendListItem';
import ListTitle from '../../components/ListTitle';
import { spacing } from '../../design';
import { selectFriends } from '../../features/friends/store/selectors';
import { fetchFriendsThunk } from '../../features/friends/store/thunks';
import { Friend } from '../../features/friends/types';
import { geolocationThunk } from '../../features/geolocation/store/thunks';
import { fetchTodosThunk } from '../../features/todos/store/thunks';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { FriendsWithTodosStackParamList } from './types';

type AllFriendsScreenNavigationProps = StackNavigationProp<
  FriendsWithTodosStackParamList,
  'AllFriends'
>;

interface AllFriendsScreenProps {
  navigation: AllFriendsScreenNavigationProps;
}

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
    <AppList
      ListHeaderComponent={() => (
        <ListTitle style={styles.header}>Friends</ListTitle>
      )}
      data={Object.values(friends)}
      keyExtractor={(friend) => `${friend!.id}`}
      initialNumToRender={20}
      renderItem={({ item }) => (
        <FriendListItem friend={item!} onPress={onFriendPress} />
      )}
    />
  );
};

export const navigationOptions: StackNavigationOptions = {
  title: 'Friends',
  headerTitle: () => null,
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.s6,
    marginTop: spacing.s3,
    paddingHorizontal: spacing.s3,
  },
});

export default AllFriendsScreen;
