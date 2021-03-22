import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Paragraph, useTheme } from 'react-native-paper';

type CardLabelProps = React.ComponentProps<typeof Paragraph>;

const CardLabel: React.FC<CardLabelProps> = ({ style, ...props }) => {
  const theme = useTheme();
  return (
    <Paragraph
      {...props}
      style={[style, styles.cardLabel, { color: theme.colors.label }]}
    />
  );
};

const styles = StyleSheet.create({
  cardLabel: {
    fontWeight: 'bold',
  },
});

export default CardLabel;
