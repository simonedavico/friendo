import * as React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { createOpenLink } from 'react-native-open-maps';
import { Avatar, Button, List } from 'react-native-paper';
import { radius, spacing } from '../design/variables';
import { FriendWithDistance } from '../features/friends/types';
import intl from '../intl';

interface FriendListItemProps {
  friend: FriendWithDistance;
  style?: ViewStyle;
  onPress: (friend: FriendWithDistance) => void;
}

const initials = (fullName: string): string => {
  const [name, surname] = fullName.split(' ');
  return name[0].toUpperCase() + surname[0].toUpperCase();
};

const FriendListItem: React.FC<FriendListItemProps> = ({
  friend,
  onPress,
  style: listItemStyle,
}) => {
  const { geo } = friend.address;
  return (
    <List.Item
      style={listItemStyle}
      onPress={() => onPress(friend)}
      title={friend.name}
      description={
        friend.distanceInKm !== undefined
          ? `${intl.formatNumber(friend.distanceInKm, {
              unit: 'kilometers',
            })} km away`
          : ''
      }
      left={({ style }) => (
        <Avatar.Text
          style={[style, styles.item, styles.avatar]}
          size={spacing.s8}
          label={initials(friend.name)}
        />
      )}
      right={({ style }) => (
        <Button
          style={[style, styles.item]}
          mode="text"
          hitSlop={{ top: 8, left: 8, bottom: 8, right: 8 }}
          onPress={createOpenLink({
            latitude: geo.lat,
            longitude: geo.lng,
          })}>
          <Text>Maps</Text>
        </Button>
      )}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    marginLeft: spacing.s2,
  },
  container: {
    paddingHorizontal: spacing.s3,
  },
  content: {
    flex: 1,
  },
  item: {
    alignSelf: 'center',
  },
  roundedBottom: {
    borderBottomStartRadius: radius.br30,
    borderBottomEndRadius: radius.br30,
  },
  roundedTop: {
    borderTopStartRadius: radius.br30,
    borderTopEndRadius: radius.br30,
  },
});

export default FriendListItem;
