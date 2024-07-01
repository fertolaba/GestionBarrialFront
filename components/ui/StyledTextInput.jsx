import { StyleSheet, TextInput } from "react-native"
import theme from "../../styles/theme"

export const StyledTextInput = ({ style, disabled, ...props }) => {
    const stylesApplied = {
        ...styles.textInput,
        ...style,
        disabled: disabled && styles.disabled,
    }

    return <TextInput style={stylesApplied} {...props} />
}

const styles = StyleSheet.create({
    textInput: {
        fontSize: theme.fontSizes.title,
        padding: 10,
        backgroundColor: theme.colors.white,
        borderWidth: 2,
        borderRadius: theme.global.borderRadius,
        borderColor: theme.colors.secondary,
        backgroundColor: theme.colors.white,
    },
    disabled: {
        backgroundColor: theme.colors.lightGray,
        color: theme.colors.red,
        opacity: 0.5,
        height: 500,
    }
})