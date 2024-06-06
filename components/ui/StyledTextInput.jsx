import { StyleSheet, TextInput } from "react-native"
import theme from "../../styles/theme"

export const StyledTextInput = ({ style, ...props }) => {
    const stylesApplied = {
        ...styles.textInput,
        ...style
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
})