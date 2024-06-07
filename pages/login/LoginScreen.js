import React from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../styles/theme';
import StyledText from '../../components/ui/StyledText';


export default function LoginScreen() {
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/vecinos/login?identifier=${identifier}&password=${password}`, {
        method: 'GET', // Cambia 'GET' a 'POST' si el backend requiere una solicitud POST
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const message = await response.text(); // Obtener el texto plano de la respuesta
        Alert.alert('Éxito', message);
        if (message === 'Eres un inspector.') {
          navigation.reset({ // Resetear la navegación y abrir una nueva pila de navegación con solo 'InicioInspector'
            index: 0,
            routes: [{ name: 'InicioInspector' }],
          });
        } else if (message === 'Eres un vecino.') {
          navigation.reset({ // Resetear la navegación y abrir una nueva pila de navegación con solo 'InicioVecino'
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
