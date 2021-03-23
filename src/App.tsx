import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { StatusBar, useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import FriendsWithTodos from './screens/FriendsWithTodos';
import UnexpectedErrorScreen from './screens/UnexpectedErrorScreen';
import store from './store';
import { useAppTheme } from './theme';

// TODO: this should be a proper logger
const logger = (e: Error) => {
  console.error(e);
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = useAppTheme();

  return (
    <Provider store={store}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <PaperProvider theme={theme}>
        <ActionSheetProvider>
          <NavigationContainer theme={theme}>
            <ErrorBoundary
              FallbackComponent={UnexpectedErrorScreen}
              onError={logger}>
              <FriendsWithTodos />
            </ErrorBoundary>
          </NavigationContainer>
        </ActionSheetProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;
