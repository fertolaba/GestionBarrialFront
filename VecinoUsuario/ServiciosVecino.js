import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ServiciosVecino = () => {
  const [cargoDelSitio, setCargoDelSitio] = useState('');
  const [apertura, setApertura] = useState('');
  const [calle, setCalle] = useState('');
  const [cierre, setCierre] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [entreCalleA, setEntreCalleA] = useState('');
  const [entreCalleB, setEntreCalleB] = useState('');
  const [numero, setNumero] = useState('');
  const [longitud, setLongitud] = useState('');
  const [latitud, setLatitud] = useState('');

  const handleSubmit = async () => {
    try {
      const data = {
        cargoDelSitio,
        apertura,
        calle,
        cierre,
        comentarios,
        entreCalleA,
        entreCalleB,
        numero,
		latitud,
		longitud,
      };

      const response = await fetch('http://localhost:8080/api/sitios/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      // Manejar respuesta exitosa
      console.log('Respuesta del servidor:', response);
      Alert.alert('Datos enviados correctamente');
    } catch (error) {
      // Manejar errores
      console.error('Error al enviar los datos:', error);
      Alert.alert('Error al enviar los datos, intenta nuevamente');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cargo del sitio"
        value={cargoDelSitio}
        onChangeText={setCargoDelSitio}
      />
      <TextInput
        style={styles.input}
        placeholder="Apertura"
        value={apertura}
        onChangeText={setApertura}
      />
      <TextInput
        style={styles.input}
        placeholder="Calle"
        value={calle}
        onChangeText={setCalle}
      />
      <TextInput
        style={styles.input}
        placeholder="Cierre"
        value={cierre}
        onChangeText={setCierre}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentarios"
        value={comentarios}
        onChangeText={setComentarios}
      />
      <TextInput
        style={styles.input}
        placeholder="Entre calle A"
        value={entreCalleA}
        onChangeText={setEntreCalleA}
      />
      <TextInput
        style={styles.input}
        placeholder="Entre calle B"
        value={entreCalleB}
        onChangeText={setEntreCalleB}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={setNumero}
        keyboardType="numeric"
      />
	        <TextInput
        style={styles.input}
        placeholder="Latitud"
        value={latitud}
        onChangeText={setLatitud}
        keyboardType="numeric"
      />
	        <TextInput
        style={styles.input}
        placeholder="Longitud"
        value={longitud}
        onChangeText={setLongitud}
        keyboardType="numeric"
      />
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ServiciosVecino;
