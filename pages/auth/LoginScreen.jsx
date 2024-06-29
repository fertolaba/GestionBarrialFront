import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../styles/theme';
import { StyledButton, StyledText, StyledTextInput } from '../../components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import { useUser } from '../../context/UserContext';
import { isNullish, exists } from '../../utils/misc';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const { user, login, logout } = useUser();

  const [loading, setLoading] = useState(false);
  const [documento, setDocumento] = useState("DNI28000046");
  const [password, setPassword] = useState("123");

  function handleRedirect() {
    if (isNullish(user)) {
      console.warn('No se redirigirá a una ruta sin un usuario logueado');
      return;
    }

    navigation.reset({ index: 0, routes: [{ name: 'Inicio' }] });
    Alert.alert('Bienvenido', `Hola ${user.nombre}!`);
  }

  async function handleLoggedUser() {

    if (isNullish(user)) {
      Alert.alert("Error", "Usuario o contraseña incorrectos");
    }
    else if (isNullish(user.tipoUsuario) || user.tipoUsuario === "N/A") {
      Alert.alert('Error', 'Tipo de usuario no reconocido, contactese con el administrador');
      await logout();
    }
  }

  async function handleLogin() {
    Promise.resolve()
      .then(() => setLoading(true))
      .then(() => login({ documento, password }))
      .then((u) => console.log(u) || u)
      .then(user => isNullish(user) && Alert.alert("Error", "Usuario o contraseña incorrectos") && console.log(user))
      .catch(_error => Alert.alert('Error inesperado', 'Algo salió mal. Inténtalo de nuevo.'))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const retrieveLoginData = async () => {
      try {
        const savedDocumento = await AsyncStorage.getItem('documento');
        const savedPassword = await AsyncStorage.getItem('password');

        if (exists(savedDocumento) && exists(savedPassword)) {
          login({
            documento: savedDocumento,
            password: savedPassword
          })
            .then(user => {
              if (isNullish(user)) {
                AsyncStorage.removeItem('password')
                AsyncStorage.removeItem('documento')
              }
            })
        }
      } catch (error) {
        console.error('Error al recuperar los datos de inicio de sesión:', error);
      }
    };
    Promise.resolve()
      .then(() => setLoading(true))
      //.then(() => retrieveLoginData()) //Eivto por ahora el login automatico porque estamos usando documento y password inicializado con usuario de prueba
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (exists(user)) {
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
        disabled={loading}
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
