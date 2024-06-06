import { StyleSheet, Text } from "react-native"
import theme from "../utils/theme"


const StyledText = ({ variant, fontSize, bold, disabled, ...props }) => {
    const appliedStyles = [
        styles.text,
        fontSize === "brand" && styles.brand,
        fontSize === "subheading" && styles.subheading,
        fontSize === "heading" && styles.heading,
        variant === "primary" && styles.colorPrimary,
        variant === "secondary" && styles.colorSecondary,
        variant === "success" && styles.success,
        variant === "alert" && styles.alert,
        variant === "warning" && styles.warning,
        disabled && styles.disabled,
        bold === "bolder" ? styles.bolder : bold && styles.bold,
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
        opacity: theme.misc.disabledOpacity
    }
})

export default StyledText;