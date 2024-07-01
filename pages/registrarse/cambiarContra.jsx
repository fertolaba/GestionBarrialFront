import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../styles/theme';
import { StyledButton, StyledText, StyledTextInput } from '../../components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';
import { isNullish, exists } from '../../utils/misc';

export const CambiarContraScreen = () => {
  const [mail, setMail] = useState("");
  const [nuevoDocumento, setNuevoDocumento] = useState("");
  const [nuevoPassword, setNuevoPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRecuperar() {
    if (!mail || !nuevoDocumento || !nuevoPassword) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    try {
      setLoading(true);
      const newUser = await register({ mail, documento: nuevoDocumento, password: nuevoPassword });
      if (newUser) {
        Alert.alert("Éxito", "Usuario registrado exitosamente");
        setMail("");
        setNuevoDocumento("");
        setNuevoPassword("");
      } else {
        Alert.alert("Error", "Error al registrar el usuario");
      }
    } catch (error) {
      Alert.alert("Error inesperado", "Algo salió mal. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <View style={styles.screenContainer}>
      <View style={styles.brandContainer}>
        <StyledText bold fontSize={"brand"}>Gestion Barrial</StyledText>
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"subheading"} bold={"medium"} style={styles.label}>Mail</StyledText>
        <StyledTextInput
          onChangeText={setMail}
          value={mail}
          placeholder='Mail'
          keyboardType='email-address'
        />
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"subheading"} bold={"medium"} style={styles.label}>Documento</StyledText>
        <StyledTextInput
          onChangeText={setNuevoDocumento}
          value={nuevoDocumento}
          placeholder='Documento o legajo'
        />
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"subheading"} bold={"medium"} style={styles.label}>Contraseña</StyledText>
        <StyledTextInput
          onChangeText={setNuevoPassword}
          value={nuevoPassword}
          placeholder='Nueva Contraseña'
          secureTextEntry={true}
        />
      </View>

      <StyledButton
        variant={'primary'}
        fontSize={'subheading'}
        onPress={handleRecuperar}
        disabled={loading}
      >
        Recuperar Contraseña
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