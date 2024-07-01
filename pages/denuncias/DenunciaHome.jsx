import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyledButton, StyledText } from '../../components/ui';
import theme from '../../styles/theme';

export default function DenunciaHome() {
  const navigation = useNavigation();

  return (
    <View style={styles.screenContainer}>
      <View style={styles.container}>
        <StyledButton variant="primary" onPress={() => navigation.navigate('GenerarDenuncia')}>
          Generar Denuncia
        </StyledButton>
        <StyledButton variant="primary" onPress={() => navigation.navigate('Listado')}>
          Todos los reclamos
        </StyledButton>
        <StyledButton variant="primary" onPress={() => navigation.navigate('Detalle')}>
          Detalle
        </StyledButton>
      </View >
    </View >
  );

}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'start',
    alignItems: 'center',
    width: "100%",
    height: "100%",
    backgroundColor: theme.colors.white,
    padding: theme.global.screenInnerPadding,
  },
  container: {
    gap: 20,
    width: "100%",
  },
});

