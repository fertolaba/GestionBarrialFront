import { StyleSheet, Text } from "react-native"
import theme from "../../styles/theme"


export const StyledText = ({ variant, fontSize, textTransform, bold, disabled, color, center, align, style, ...props }) => {
  const appliedStyles = [
    styles.text,
    variant && ["primary", "secondary", "success", "alert", "warning"].includes(variant) && styles[variant],
    fontSize && ["screenTitle", "brand", "heading", "subheading", "title", "subtitle"].includes(fontSize) && styles[fontSize],
    bold && [true, "medium", "bold", "bolder"].includes(bold) && bold === true ? styles.bold : styles[bold],
    disabled && styles.disabled,
    textTransform && styles[textTransform],
    color && { color },
    center && styles.center,
    align && ["left", "right", "center", "justify"].includes(align) && { textAlign: align },
    style, // por si igual faltan styles personalizados
  ]

  return <Text style={appliedStyles} {...props} />
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal
  },
  primary: {
    color: theme.colors.primary,
  },
  secondary: {
    color: theme.colors.secondary,
  },
  success: {
    color: theme.colors.success
  },
  alert: {
    color: theme.colors.alert
  },
  warning: {
    color: theme.colors.warning
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
  small: {
    fontWeight: theme.fontSizes.small
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
    opacity: theme.global.disabledOpacity
  },
  lowercase: {
    textTransform: "lowercase"
  },
  uppercase: {
    textTransform: "uppercase"
  },
  capitalize: {
    textTransform: "capitalize"
  },
  center: {
    textAlign: "center"
  },
  left: {
    textAlign: "left"
  },
  right: {
    textAlign: "right"
  },
  justify: {
    textAlign: "justify"
  }
})

export default StyledText;