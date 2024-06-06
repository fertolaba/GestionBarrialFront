import { StyleSheet, Text } from "react-native"
import theme from "../../styles/theme"


const StyledText = ({ variant, fontSize, textTransform, bold, disabled, color, style, ...props }) => {
  const appliedStyles = [
    styles.text,
    ["primary", "secondary", "success", "alert", "warning"].includes(variant) && styles[variant],
    ["brand", "heading", "subheading", "title", "subtitle"].includes(fontSize) && styles[fontSize],
    [true, "medium", "bold", "bolder"].includes(bold) && bold === true ? styles.bold : styles[bold],
    disabled && styles.disabled,
    textTransform && styles[textTransform],
    color && { color },
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
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorSecondary: {
    color: theme.colors.secondary,
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
  success: {
    color: theme.colors.success
  },
  alert: {
    color: theme.colors.alert
  },
  warning: {
    color: theme.colors.warning
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
  }
})

export default StyledText;