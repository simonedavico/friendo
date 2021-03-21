import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createOpenLink } from 'react-native-open-maps';
import { spacing } from '../design';
import { FriendWithDistance } from '../features/friends/types';
import intl from '../intl';
import Button from './Button';

interface FriendListItemProps {
  friend: FriendWithDistance;
  onPress: (friend: FriendWithDistance) => void;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend, onPress }) => {
  const { geo } = friend.address;
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(friend)}>
      <View style={styles.content}>
        <Text>{friend.name}</Text>
        {friend.distanceInKm !== undefined ? (
          <Text>
            is {intl.formatNumber(friend.distanceInKm, { unit: 'kilometers' })}{' '}
            away
          </Text>
        ) : null}
      </View>
      <Button
        hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
        onPress={createOpenLink({ latitude: geo.lat, longitude: geo.lng })}>
        <Text>Maps</Text>
      </Button>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: spacing.s2,
    paddingVertical: spacing.s5,
  },
  content: {
    flex: 1,
  },
});

export default FriendListItem;
