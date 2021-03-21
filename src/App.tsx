import { NavigationContainer } from '@react-navigation/native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import * as React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import FriendsWithTodos from './screens/FriendsWithTodos';
import store from './store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ActionSheetProvider>
        <NavigationContainer>
          <FriendsWithTodos />
        </NavigationContainer>
      </ActionSheetProvider>
    </Provider>
  );
};

export default App;
