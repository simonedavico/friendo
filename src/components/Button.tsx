import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { radius, spacing, typography } from '../design';

type ButtonProps = TouchableOpacityProps;

// TODO: add support for icon
const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  style,
  ...props
}) => {
  const buttonStyle = StyleSheet.compose<ViewStyle>(styles.button, style);
  const disabledButtonStyle = StyleSheet.compose<ViewStyle>(
    buttonStyle,
    disabled ? styles.disabled : {},
  );
  return (
    <TouchableOpacity
      style={disabledButtonStyle}
      disabled={disabled}
      {...props}>
      <View style={styles.buttonContentContainer}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // TODO: change depending on variant
    // TODO: move colors to palette
    backgroundColor: '#deedfc',
    borderRadius: radius.br30,
    paddingHorizontal: spacing.s5,
    paddingVertical: spacing.s2,
  },
  buttonContentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  disabled: { opacity: 0.6 },
  buttonText: {
    color: '#224591',
    fontSize: typography.text80,
    fontWeight: 'bold',
  },
});

export default Button;
