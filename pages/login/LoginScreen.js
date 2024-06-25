import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../styles/theme';
import { StyledButton, StyledText, StyledTextInput } from '../../components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import { useUser } from '../../context/UserContext';
import { isNullOrUndefined } from '../../utils/misc';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { user, login, logout } = useUser();

  const [documento, setDocumento] = useState("DNI28000046");
  const [password, setPassword] = useState("123");

  function handleRedirect() {
    let ruta;

    if (isNullOrUndefined(user)) {
      console.warn('No se redirigirá a una ruta sin un usuario logueado');
      return;
    }

    switch (user?.tipoUsuario) {
      case 'inspector':
        ruta = 'InicioInspector';
        break;
      case 'vecino':
        ruta = 'InicioVecino';
        break;
      default:
        console.warn('Tipo de usuario no reconocido');
    }

    if (ruta) {
      navigation.reset({
        index: 0,
        routes: [{ name: ruta }],
      });
      Alert.alert('Bienvenido', `Hola ${user.nombre}!`);
    }
  }

  async function handleLoggedUser() {
    console.warn({ user });
    if (isNullOrUndefined(user)) {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
    else if (isNullOrUndefined(user.tipoUsuario) || user.tipoUsuario === "N/A") {
      Alert.alert('Error', 'Tipo de usuario no reconocido');
      await logout();
    }
  }

  async function handleLogin() {
    try {
      await login({ documento, password });
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error inesperado', 'Algo salió mal. Inténtalo de nuevo.');
    }
  }

  useEffect(() => {
    const retrieveLoginData = async () => {
      try {
        const savedDocumento = await AsyncStorage.getItem('documento');
        const savedPassword = await AsyncStorage.getItem('password');

        if (savedDocumento && savedPassword) {
          await login({
            documento: savedDocumento,
            password: savedPassword
          });
        }
      } catch (error) {
        console.error('Error al recuperar los datos de inicio de sesión:', error);
      }
    };

    retrieveLoginData();
  }, []);

  useEffect(() => {
    if (!isNullOrUndefined(user)) {
      handleRedirect();
      handleLoggedUser();
    }
  }, [user?.documento]);

  return (
    <View style={styles.screenContainer}>
      <View style={styles.brandContainer}>
        <StyledText bold fontSize={"brand"}>Gestion Barrial</StyledText>
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"subheading"} bold={"medium"} style={styles.label}>Identificación</StyledText>
        <StyledTextInput
          onChangeText={setDocumento}
          value={documento}
          placeholder='Documento o legajo'
          keyboardType='email-address'
        />
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"subheading"} bold={"medium"} style={styles.label}>Contraseña</StyledText>
        <StyledTextInput
          onChangeText={setPassword}
          value={password}
          placeholder='Contraseña'
          secureTextEntry={true}
        />
      </View>


      <StyledButton
        variant={'primary'}
        fontSize={'subheading'}
        onPress={handleLogin}
      >
        Iniciar sesión
      </StyledButton>

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
