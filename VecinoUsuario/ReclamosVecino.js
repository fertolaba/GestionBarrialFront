import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StyledButton } from '../components/ui';
import { useNavigation } from '@react-navigation/native';

export default function ReclamosVecino() {

  const navigation = useNavigation();

  const goToGenerarReclamos = () => {
    navigation.navigate('GenerarReclamos');
  };

  return (
    <View style={styles.container}>
      <StyledButton variant="primary" onPress={goToGenerarReclamos}>
        Generar reclamo
      </StyledButton>
      <StyledButton variant="primary" onPress={() => navigation.navigate('EstadoReclamo')}>
        Estado de reclamos
      </StyledButton>
      <StyledButton variant="primary" onPress={() => navigation.navigate('ReclamosPendientes')}>
        Reclamos pendientes
      </StyledButton>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "flex-start"
  },
})
