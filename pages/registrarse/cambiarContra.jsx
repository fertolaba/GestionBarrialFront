import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../styles/theme';
import { StyledButton, StyledText, StyledTextInput } from '../../components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

import { useUser } from '../../context/UserContext';
import { isNullish, exists } from '../../utils/misc';

export const CambiarContra = () => {
  const [mail, setMail] = useState("");
  const [nuevoDocumento, setNuevoDocumento] = useState("");
  const [nuevoPassword, setNuevoPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegistro() {
    const [mail, setMail] = useState("");
    const [nuevoPassword, setNuevoPassword] = useState("");
    const [loading, setLoading] = useState(false);
  
    async function handleCambioContrasena() {
      if (!mail || !nuevoPassword) {
        Alert.alert("Error", "Por favor complete todos los campos");
        return;
      }
  
      try {
        setLoading(true);
        const response = await cambiarContrasena({ mail, password: nuevoPassword });
        if (response.success) {
          Alert.alert("Éxito", "Contraseña cambiada exitosamente");
          setMail("");
          setNuevoPassword("");
        } else {
          Alert.alert("Error", "Error al cambiar la contraseña");
        }
      } catch (error) {
        Alert.alert("Error inesperado", "Algo salió mal. Inténtalo de nuevo.");
      } finally {
        setLoading(false);
      }
    }
  
    async function cambiarContrasena({ mail, password }) {
      const response = await fetch('http://localhost:8080/api/auth/cambiar-contrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mail, password })
      });
  
      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }
  
      return await response.json();
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
          <StyledText fontSize={"subheading"} bold={"medium"} style={styles.label}>Nueva Contraseña</StyledText>
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
          onPress={handleCambioContrasena}
          disabled={loading}
        >
          Cambiar Contraseña
        </StyledButton>
      </View>
    );

}
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