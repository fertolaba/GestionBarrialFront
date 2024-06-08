import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../styles/theme';
import StyledText from '../../components/ui/StyledText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';


export default function LoginScreen() {
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();

  useEffect(() => {
    retrieveLoginData();
  }, []);

  const retrieveLoginData = async () => {
    try {
      const savedIdentifier = await AsyncStorage.getItem('identifier');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedIdentifier !== null && savedPassword !== null) {
        setIdentifier(savedIdentifier);
        setPassword(savedPassword);
      }
    } catch (error) {
      console.error('Error al recuperar los datos de inicio de sesión:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/vecinos/login?identifier=${identifier}&password=${password}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const message = await response.text(); 
        Alert.alert('Éxito', message);
        await AsyncStorage.setItem('identifier', identifier);
        await AsyncStorage.setItem('password', password);
        if (message === 'Eres un inspector.') {
          navigation.reset({ 
            index: 0,
            routes: [{ name: 'InicioInspector' }],
          });
        } else if (message === 'Eres un vecino.') {
          navigation.reset({ 
            index: 0,
            routes: [{ name: 'InicioVecino' }],
          });
        }
      } else {
        const errorData = await response.text();
        Alert.alert('Error', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Algo salió mal. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.brandContainer}>
        <StyledText bold fontSize={"brand"}>Gestion Barrial</StyledText>
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"title"} bold={"medium"} style={styles.label}>Email</StyledText>
        <TextInput
          onChangeText={setIdentifier}
          value={identifier}
          style={styles.input}
          placeholder='Email'
          keyboardType='email-address'
        />
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"title"} bold={"medium"} style={styles.label}>Contraseña</StyledText>
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={styles.input}
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
  label: {

  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: "#ffffff",
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
