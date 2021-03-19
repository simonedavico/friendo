import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import FriendsWithTodos from './src/screens/FriendsWithTodos';
import store from './src/store';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <FriendsWithTodos />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
