import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import theme from '../../styles/theme';
import { StyledButton, StyledText, StyledTextInput } from '../../components/ui';

import usuariosServices from '../../services/usuarios.services';
import { useNavigation } from '@react-navigation/native';

export const ChangePasswordScreen = ({ route }) => {
  const navigation = useNavigation()
  const { documento = "", passwordAntiguo = "" } = route.params;

  const [loading, setLoading] = useState(false);
  const [documentoUsuario, setDocumentoUsuario] = useState(documento);
  const [passwordAntiguoUsuario, setPasswordAntiguoUsuario] = useState(passwordAntiguo);
  const [nuevoPassword, setNuevoPassword] = useState("");

  const invalidForm = !documentoUsuario || !passwordAntiguoUsuario || !nuevoPassword;
  
  async function handleRecuperar() {
    if (invalidForm) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    setLoading(true)

    const { status, message } = await usuariosServices.updatePassword({
      documento: documentoUsuario
      , passwordAntiguo: passwordAntiguoUsuario
      , password: nuevoPassword
    });


    Alert.alert(message.title, message.description);
    console.log({ status, ok: status === 200 })
    setLoading(false);

    if (status === 200) {
      setDocumentoUsuario("");
      setPasswordAntiguoUsuario("");
      setNuevoPassword("");

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login', params: { documento: documentoUsuario } }],
      });
    }

  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.brandContainer}>
        <StyledText bold fontSize={"brand"}>Gestion Barrial</StyledText>
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"subheading"} bold={"medium"} style={styles.label}>Documento</StyledText>
        <StyledTextInput
          value={documentoUsuario}
          onChangeText={setDocumentoUsuario}
          placeholder='Documento'
        />
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"subheading"} bold={"medium"} style={styles.label}>Contraseña anterior</StyledText>
        <StyledTextInput
          value={passwordAntiguoUsuario}
          onChangeText={setPasswordAntiguoUsuario}
          placeholder='Contraseña anterior'
          secureTextEntry={true}
        />
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"subheading"} bold={"medium"} style={styles.label}>Nueva Contraseña</StyledText>
        <StyledTextInput
          value={nuevoPassword}
          onChangeText={setNuevoPassword}
          placeholder='Nueva Contraseña'
          secureTextEntry={true}
        />
      </View>

      <StyledButton
        variant={'primary'}
        fontSize={'subheading'}
        onPress={handleRecuperar}
        disabled={loading || invalidForm}
      >
        Cambiar Contraseña
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