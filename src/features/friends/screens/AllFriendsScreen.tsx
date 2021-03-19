import * as React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchFriendsThunk } from '../store/thunks';

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
      data={Object.values(friends)}
      keyExtractor={(friend) => `${friend!.id}`}
      renderItem={({ item }) => (
        <View>
          <Text>{item!.name}</Text>
        </View>
      )}
    />
  );
};

export default AllFriendsScreen;
