import * as React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { Provider } from 'react-redux';
import FriendsWithTodos from './screens/FriendsWithTodos';
import store from './store';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      label: string;
    }
  }
}

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: '#f3f4f5',
    surface: 'white',
    label: '#8e949a',
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    label: '#8e949a',
  },
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <PaperProvider
        theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
        <ActionSheetProvider>
          <NavigationContainer
            theme={isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme}>
            <FriendsWithTodos />
          </NavigationContainer>
        </ActionSheetProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
