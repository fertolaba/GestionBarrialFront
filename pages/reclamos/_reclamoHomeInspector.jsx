import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StyledText } from '../../components/ui';
//import { StyledButton } from '../components/ui';
//import { useNavigation } from '@react-navigation/native';

export default function ReclamoHomeInspector() {

    //Este codigo era de reclamo home vecino
    //   const navigation = useNavigation();

    //   const goToGenerarReclamos = () => {
    //     navigation.navigate('GenerarReclamos');
    //   };

    return (
        <View style={styles.container}>
            <StyledText>SOY PANTALLA DE RECLAMO -&gt; INSPECTOR </StyledText>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        justifyContent: "flex-start"
    },
})
