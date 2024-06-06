import { Pressable, StyleSheet, Text } from "react-native"
import theme from "../../styles/theme"


const StyledButtonText = ({ variant, fontSize, textTransform, bold, disabled, color, style, textStyle, ...props }) => {
    const appliedStyles = [
        styles.button,
        ["primary", "secondary", "success", "alert", "warning"].includes(variant) && styles[variant],
        disabled && styles.disabled,
        style, // por si igual faltan styles personalizados
    ]

    const textStyles = [
        styles.text,
        ["primary", "secondary", "success", "alert", "warning"].includes(variant) && styles[`text-${variant}`],
        ["brand", "heading", "subheading", "title", "subtitle"].includes(fontSize) && styles[fontSize],
        [true, "medium", "bold", "bolder"].includes(bold) && bold === true ? styles.bold : styles[bold],
        textTransform && styles[textTransform],
        color && { color },
        textStyle,
    ]

    return (
        <Pressable style={appliedStyles} {...props} >
            <Text style={textStyles}>
                !! composable button WIP !!!
                {
                    props.title    // title si se intenta usar como un Button de React-Native
                }
                {
                    props.children // children si se encierra entre las etiquetas del componente
                }
            </Text>
        </Pressable>
    )

}

const styles = StyleSheet.create({
    button: {
        width: "auto",
        padding: 8,
        borderRadius: 2,
        justifyContent: "center",
        alignItems: "center",
    },
    primary: {
        backgroundColor: theme.colors.primary,
    },
    secondary: {
        backgroundColor: theme.colors.secondary,
    },
    success: {
        backgroundColor: theme.colors.success
    },
    alert: {
        backgroundColor: theme.colors.alert
    },
    warning: {
        backgroundColor: theme.colors.warning
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
    text: {
        color: theme.colors.text,
        fontSize: theme.fontSizes.body,
        fontWeight: theme.fontWeights.normal
    },
    ["text-primary"]: {
        color: theme.colors.white
    },
    ["text-secondary"]: {
        color: theme.colors.text
    },
    ["text-success"]: {
        color: theme.colors.white
    },
    ["text-alert"]: {
        color: theme.colors.white
    },
    ["text-warning"]: {
        color: theme.colors.text
    },
})

export default StyledButtonText;