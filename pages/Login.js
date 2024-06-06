import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // Aquí puedes agregar la lógica para iniciar sesión
    // Por ejemplo, podrías llamar a una función que maneje la autenticación con Firebase
    // o realizar una solicitud HTTP a tu backend para verificar las credenciales del usuario
    // Por ahora, dejaremos esta función vacía ya que no tienes la lógica de inicio de sesión
    // También puedes mostrar una alerta o realizar otras acciones según sea necesario
  };

  return (
    <View>
      <Text style={{ fontSize: 17, fontWeight: "400" }}>Email</Text>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
      />
      <Text style={{ fontSize: 17, fontWeight: "400" }}>Contraseña</Text>
      <TextInput
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholder='Contraseña'
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ fontSize: 17, fontWeight: "400" }}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 250,
    height: 40,
    padding: 10,
    backgroundColor: "#ffffff",
    marginBottom: 20, // Añadí un margen inferior para separar los campos de entrada
  },
  button: {
    width: 250,
    height: 40,
    backgroundColor: "#00CFEB90",
    alignItems: "center",
    justifyContent: "center", // Añadí justifyContent para centrar el texto verticalmente
  },
});
