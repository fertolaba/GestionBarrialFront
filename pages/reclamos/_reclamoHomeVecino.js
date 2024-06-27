import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StyledButton, StyledText } from '../../components/ui';
import { useNavigation } from '@react-navigation/native';

export default function ReclamoHomeVecino() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StyledText>SOY PANTALLA DE RECLAMO -&gt; VECINO </StyledText>
      <StyledButton variant="primary" onPress={() => navigation.navigate('GenerarReclamos')}>
        Generar reclamo
      </StyledButton>
      <StyledButton variant="primary" onPress={() => navigation.navigate('EstadoReclamo')}>
        Estado de reclamos
      </StyledButton>
      <StyledButton variant="primary" onPress={() => navigation.navigate('ReclamosPendientes')}>
        Reclamos pendientes
      </StyledButton>
    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "flex-start"
  },
})
