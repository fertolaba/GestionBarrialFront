import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export const StyledButton = ({
  title, children, style, onPress,
  variant, fontSize, textTransform, bold, disabled, color, textStyle,
  naked,
  ...props
}) => {

  const appliedButtonStyles = [
    styles.button,
    variant && ["primary", "secondary", "success", "alert", "warning"].includes(variant) && styles[variant],
    naked && styles.naked,
    disabled && styles.disabled,
    style
  ]

  const appliedTextStyles = [
    styles.text,
    styles.medium,
    styles.title,
    variant && ["primary", "secondary", "success", "alert", "warning"].includes(variant) && styles[`text-${variant}`],
    fontSize && ["screenTitle", "brand", "heading", "subheading", "title", "subtitle"].includes(fontSize) && styles[fontSize],
    bold && [true, "medium", "bold", "bolder"].includes(bold) && bold === true ? styles.bold : styles[bold],
    textTransform && styles[textTransform],
    color && { color },
    textStyle
  ]


  return (
    <Pressable
      style={({ pressed }) => ([
        ...appliedButtonStyles,
        pressed && styles.pressed,
        style,
      ])}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      <Text style={[...appliedTextStyles]}>{title}{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  naked: {
    elevation: 0,
    shadowColor: 'transparent',
  },
  button: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 2,
    margin: 5,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: "center",
  },
  pressed: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    elevation: 0,
    opacity: 0.8,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
    textAlign: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  ["text-primary"]: {
    color: theme.colors.white,
  },
  secondary: {
    backgroundColor: theme.colors.secondary,
  },
  ["text-secondary"]: {
    color: theme.colors.text,
  },
  success: {
    backgroundColor: theme.colors.success
  },
  ["text-success"]: {
    color: theme.colors.white,
  },
  alert: {
    backgroundColor: theme.colors.alert
  },
  ["text-alert"]: {
    color: theme.colors.white,
  },
  warning: {
    backgroundColor: theme.colors.warning
  },
  ["text-warning"]: {
    color: theme.colors.white,
  },
  screenTitle: {
    fontSize: theme.fontSizes.screenTitle
  },
  brand: {
    fontSize: theme.fontSizes.brand
  },
  heading: {
    fontSize: theme.fontSizes.heading
  },
  subheading: {
    fontSize: theme.fontSizes.subheading
  },
  title: {
    fontSize: theme.fontSizes.title
  },
  subtitle: {
    fontSize: theme.fontSizes.subtitle
  },
  medium: {
    fontWeight: theme.fontWeights.medium
  },
  bold: {
    fontWeight: theme.fontWeights.bold
  },
  bolder: {
    fontWeight: theme.fontWeights.bolder
  },
  disabled: {
    opacity: theme.global.disabledOpacity,
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
  },
  lowercase: {
    textTransform: "lowercase"
  },
  uppercase: {
    textTransform: "uppercase"
  },
  capitalize: {
    textTransform: "capitalize"
  }
});
