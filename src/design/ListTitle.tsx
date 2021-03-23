import * as React from 'react';
import { TextProps, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { Title } from 'react-native-paper';
import { typography } from './variables';

interface ListTitleProps extends TextProps {
  testID?: string;
}

const ListTitle: React.FC<ListTitleProps> = ({
  children,
  style,
  testID,
  ...props
}) => {
  const titleStyles = StyleSheet.compose(
    styles.title as StyleProp<TextStyle>,
    style,
  );
  return (
    <Title testID={testID} {...props} style={titleStyles}>
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
