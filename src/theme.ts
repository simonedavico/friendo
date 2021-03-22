import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import { radius, spacing } from './design/variables';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      label: string;
    }
  }
}

export const AppDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  roundness: radius.br30,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    background: '#f3f4f5',
    surface: 'white',
    label: '#8e949a',
  },
};

export const AppDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  roundness: spacing.s2,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    label: '#8e949a',
  },
};

export const useAppTheme = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return isDarkMode ? AppDarkTheme : AppDefaultTheme;
};
