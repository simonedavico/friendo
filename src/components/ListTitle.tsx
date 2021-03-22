import * as React from 'react';
import { TextProps, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { Title } from 'react-native-paper';
import { typography } from '../design';

type ListTitleProps = TextProps;

const ListTitle: React.FC<ListTitleProps> = ({ children, style, ...props }) => {
  const titleStyles = StyleSheet.compose(
    styles.title as StyleProp<TextStyle>,
    style,
  );
  return (
    <Title {...props} style={titleStyles}>
      {children}
    </Title>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: typography.text30,
    fontWeight: 'bold',
    lineHeight: typography.text30,
  },
});

export default ListTitle;
