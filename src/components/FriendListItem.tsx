import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { spacing } from '../design';
import { FriendWithDistance } from '../features/friends/types';
import intl from '../intl';

interface FriendListItemProps {
  friend: FriendWithDistance;
  onPress: (friend: FriendWithDistance) => void;
}

const FriendListItem: React.FC<FriendListItemProps> = ({ friend, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={() => onPress(friend)}>
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

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: spacing.s2,
    paddingVertical: spacing.s5,
    borderBottomWidth: 1,
  },
});

export default FriendListItem;
