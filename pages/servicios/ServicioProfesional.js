import React from 'react'
import { View, StyleSheet } from 'react-native'
import theme from '../../styles/theme';
import StyledText from '../../components/ui/StyledText';

const CrearServicioProfesional = ({ navigation }) => {
    return (
        <View style={styles.screenContainer}>
            <View style={styles.container}>
                <StyledText fontSize={'brand'}>Servicio</StyledText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        justifyContent: 'start',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: theme.colors.white,
        padding: theme.global.screenInnerPadding,
    },
    container: {
        gap: 20,
    },
    btn: {
        padding: 5,
        margin: 5,
    }
});

export default CrearServicioProfesional;