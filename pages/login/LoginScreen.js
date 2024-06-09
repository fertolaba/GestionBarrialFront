import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../styles/theme';
import { StyledText, StyledTextInput } from '../../components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import { useUser } from '../../context/UserContext';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { user, login } = useUser();

  const [identificador, setIdentificador] = useState("DNI28000046");
  const [password, setPassword] = useState("123");

  useEffect(() => {
    retrieveLoginData();
  }, []);

  const retrieveLoginData = async () => {
    try {
      const savedidentificador = await AsyncStorage.getItem('identificador');
      const savedPassword = await AsyncStorage.getItem('password');

      if (savedidentificador !== null && savedPassword !== null) {
        setIdentificador(savedidentificador);
        setPassword(savedPassword);

        handleLogin();
      }
    } catch (error) {
      console.error('Error al recuperar los datos de inicio de sesión:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const usuarioLoggeado = await login({ identificador, password })

      if (usuarioLoggeado) {
        Alert.alert('Bienvenido', `Hola ${usuarioLoggeado.nombre}!`);
        await AsyncStorage.setItem('identificador', usuarioLoggeado.identificador);
        await AsyncStorage.setItem('password', password);

        switch (usuarioLoggeado.tipoUsuario) {
          case 'inspector':
            navigation.reset({
              index: 0,
              routes: [{ name: 'InicioInspector' }],
            });
            break;
          case 'vecino':
            navigation.reset({
              index: 0,
              routes: [{ name: 'InicioVecino' }],
            });
            break;
          default:
            Alert.alert('Error', 'Tipo de usuario no reconocido');
        }

      } else {
        Alert.alert("Error", "Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error inesperado', 'Algo salió mal. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.brandContainer}>
        <StyledText bold fontSize={"brand"}>Gestion Barrial</StyledText>
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"subheading"} bold={"medium"} style={styles.label}>Identificación</StyledText>
        <StyledTextInput
          onChangeText={setIdentificador}
          value={identificador}
          placeholder='Documento o legajo'
          keyboardType='email-address'
        />
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"title"} bold={"medium"} style={styles.label}>Contraseña</StyledText>
        <StyledTextInput
          onChangeText={setPassword}
          value={password}
          placeholder='Contraseña'
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <StyledText fontSize={"title"} color={"white"}>Iniciar sesión</StyledText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    padding: theme.global.screenInnerPadding,
    gap: 25,
  },
  brandContainer: {
    marginBottom: 20,
  },
  formGroup: {
    gap: 2,
    width: "100%",
    maxWidth: 600,
  },
  button: {
    width: "100%",
    maxWidth: 600,
    height: 40,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
});
