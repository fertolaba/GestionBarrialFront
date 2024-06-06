import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import theme from '../../styles/theme';
import StyledText from '../../components/StyledText';

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    console.warn({
      email,
      password,
    })
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.brandContainer}>
        <StyledText bold fontSize={"brand"}>Gestion Barrial</StyledText>
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"title"} bold={"medium"} style={styles.label}>Email</StyledText>
        <TextInput
          onChangeText={setEmail}
          style={styles.input}
          placeholder='Email'
          keyboardType='email-address'
        />
      </View>

      <View style={styles.formGroup}>
        <StyledText fontSize={"title"} bold={"medium"} style={styles.label}>Contraseña</StyledText>
        <TextInput
          onChangeText={setPassword}
          style={styles.input}
          placeholder='Contraseña'
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <StyledText fontSize={"title"} color={"white"}>Iniciar sesión</StyledText>
      </TouchableOpacity>
    </View >
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
