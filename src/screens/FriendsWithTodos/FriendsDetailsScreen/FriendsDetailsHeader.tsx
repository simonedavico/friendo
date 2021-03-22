import * as React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { createOpenLink } from 'react-native-open-maps';
import { Avatar, Button, Card, Divider, Paragraph } from 'react-native-paper';
import ListTitle from '../../../design/ListTitle';
import CardLabel from '../../../design/CardLabel';
import { spacing } from '../../../design/variables';
import { Friend } from '../../../features/friends/types';

interface FriendsDetailsHeaderProps {
  friend: Friend;
  onTodoAdd: () => void;
}

const FriendsDetailsHeader: React.FC<FriendsDetailsHeaderProps> = ({
  friend,
  onTodoAdd,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <View style={styles.avatarAndName}>
          <Avatar.Text size={48} label="XD" />
          <ListTitle style={styles.listTitle}>{friend.name}</ListTitle>
        </View>
        <View style={styles.detailsCard}>
          <CardLabel style={styles.cardLabel}>Contact Details</CardLabel>
          <Card elevation={0}>
            <Card.Content>
              <View style={styles.location}>
                <Avatar.Icon size={24} icon="home" />
                <Paragraph style={styles.locationText}>
                  {friend.address.city}, {friend.address.street} (
                  {friend.address.zipcode})
                </Paragraph>
              </View>
              <Divider />
            </Card.Content>
            <Card.Actions>
              <Button
                icon="phone"
                onPress={() => {
                  Linking.openURL(`tel:${friend.phone}`);
                }}
                style={styles.actionButton}>
                Call
              </Button>
              <Button
                onPress={createOpenLink({
                  latitude: friend.address.geo.lat,
                  longitude: friend.address.geo.lng,
                })}
                icon="near-me"
                style={styles.actionButton}>
                Maps
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </View>
      <View style={styles.todoListTitle}>
        <CardLabel style={styles.cardLabel}>Todos</CardLabel>
        <Button onPress={onTodoAdd} icon="plus">
          Add Todo
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: { flex: 1 },
  avatarAndName: {
    flexDirection: 'row',
  },
  button: {
    marginRight: spacing.s2,
  },
  cardLabel: {
    marginBottom: spacing.s2,
    flex: 1,
  },
  detailsCard: {
    marginTop: spacing.s8,
  },
  headerContainer: {
    paddingHorizontal: spacing.s3,
  },
  header: {
    marginBottom: spacing.s8,
    marginTop: spacing.s3,
  },
  headerButtons: {
    flexDirection: 'row',
    margin: spacing.s2,
  },
  listTitle: {
    marginLeft: spacing.s3,
    alignSelf: 'flex-end',
  },
  location: {
    flexDirection: 'row',
    marginBottom: spacing.s4,
  },
  locationText: {
    marginLeft: spacing.s3,
    flex: 1,
  },
  todoListTitle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.s1,
  },
});

export default FriendsDetailsHeader;
