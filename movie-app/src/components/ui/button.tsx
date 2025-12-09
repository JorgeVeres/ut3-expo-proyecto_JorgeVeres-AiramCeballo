import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import React from 'react';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  onPress,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
}: ButtonProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: variant === 'primary' ? colors.primary : colors.secondary,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});