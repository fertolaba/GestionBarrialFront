import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../styles/theme';
import { StyledButton, StyledText, StyledTextInput } from '../../components/ui';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';
import { isNullish, exists } from '../../utils/misc';
import usuariosServices from '../../services/usuarios.services';

export const RegistrarseScreen = () => {
  const {navigation} = useNavigation()
  const [mail, setMail] = useState("");
  const [nuevoDocumento, setNuevoDocumento] = useState("");

  const [simularRechazo, setSimularRechazo] = useState(false)
  const [loading, setLoading] = useState(false);
console.log({simularRechazo})
  async function handleRegistro() {
    if (!mail || !nuevoDocumento) {
      Alert.alert("Error", "Por favor complete todos los campos");
      return;
    }

    try {
      setLoading(true);
      const {status, message} = await usuariosServices.altaUsuario(nuevoDocumento, mail, simularRechazo)
      
            console.log({
              status,
              simularRechazo,
              message
            })
      
      Alert.alert(message.title, message.description)

      if (status === 200) {
        setMail("");
        setNuevoDocumento("");
        navigation.navigate('Login', { documento: nuevoDocumento })
      } 

    } catch (error) {
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

      <StyledButton
        variant={!simularRechazo ? 'warning' : "success"}
        onPress={() => setSimularRechazo(!simularRechazo)}
      >
        (debug) Marcar como alta
        {
          simularRechazo
            ? " Exitosa"
            : " con error"
        }
      </StyledButton>


      <StyledButton
        variant={'primary'}
        fontSize={'subheading'}
        onPress={handleRegistro}
        disabled={loading}
      >
        Registrarse
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