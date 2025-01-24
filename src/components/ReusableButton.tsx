import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ReusableButton = ({
  title = 'Button',
  onPress = () => {},
  style = {},
  textStyle = {},
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        disabled && styles.disabledButton, // Apply disabled styles
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled} // Disable the button if `disabled` is true
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
});

export default ReusableButton;
