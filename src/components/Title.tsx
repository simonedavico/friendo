import * as React from 'react';
import {
  TextProps,
  Text,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';
import { typography } from '../design';

type TitleProps = TextProps;

const Title: React.FC<TitleProps> = ({ children, style, ...props }) => {
  const titleStyles = StyleSheet.compose(
    styles.title as StyleProp<TextStyle>,
    style,
  );
  return (
    <Text style={titleStyles} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: typography.text30,
    fontWeight: 'bold',
  },
});

export default Title;
