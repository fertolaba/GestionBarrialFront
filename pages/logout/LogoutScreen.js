import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyledButton } from '../../components/ui';

export default function LogoutScreen() {
  const navigation = useNavigation();

  const handleBackToHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Inicio' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Sesión Cerrada</Text>
      <StyledButton title="Volver a inicio" variant='primary' onPress={handleBackToHome} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
  },
});