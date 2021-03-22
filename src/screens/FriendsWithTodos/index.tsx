import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AllFriendsScreen, {
  navigationOptions as friendsNavOptions,
} from './AllFriendsScreen';
import FriendDetailsScreen, {
  navigationOptions as todosNavOptions,
} from './FriendsDetailsScreen';
import { FriendsWithTodosStackParamList } from './types';
import { useTheme } from 'react-native-paper';

const Stack = createStackNavigator<FriendsWithTodosStackParamList>();

const FriendsWithTodos: React.FC = () => {
  const theme = useTheme();
  const screenOptions = React.useMemo(
    () => ({
      headerStyle: {
        backgroundColor: theme.colors.background,
        borderBottomWidth: 0,
        shadowColor: 'transparent',
      },
    }),
    [theme],
  );

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="AllFriends">
      <Stack.Screen
        name="AllFriends"
        options={friendsNavOptions}
        component={AllFriendsScreen}
      />
      <Stack.Screen
        name="TodosForFriend"
        component={FriendDetailsScreen}
        options={todosNavOptions}
      />
    </Stack.Navigator>
  );
};

export default FriendsWithTodos;
