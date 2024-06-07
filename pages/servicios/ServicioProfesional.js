import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';

import { StyledButton, StyledTextInput } from '../../components/ui';
import { numberRegex } from '../../utils/regex';
import theme from '../../styles/theme';

const ServicioProfesional = ({ navigation }) => {
  const [cargoDelSitio, setCargoDelSitio] = useState('');

  const [calle, setCalle] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [entreCalleA, setEntreCalleA] = useState('');
  const [entreCalleB, setEntreCalleB] = useState('');
  const [numero, setNumero] = useState('');
  const [longitud, setLongitud] = useState('');
  const [latitud, setLatitud] = useState('');

  const [apertura, setApertura] = useState(new Date());
  const [cierre, setCierre] = useState(new Date());

  const [disableButton, setDisableButton] = useState(false);


  const clearInputs = () => {
    setCargoDelSitio("")
    setApertura("")
    setCalle("")
    setCierre("")
    setComentarios("")
    setEntreCalleA("")
    setEntreCalleB("")
    setNumero("")
    setLongitud("")
    setLatitud("")
  }

  const handleNumericInputChange = (value, setter) => {
    if (value === '' || numberRegex.test(value)) {
      setter(value);
    }
  };

  const validateFields = () => {
    if (
      cargoDelSitio === '' ||
      apertura === '' ||
      calle === '' ||
      cierre === '' ||
      comentarios === '' ||
      entreCalleA === '' ||
      entreCalleB === '' ||
      numero === '' ||
      longitud === '' ||
      latitud === ''
    ) {
      Alert.alert('Todos los campos son requeridos');
      return false;
    } else if (!numberRegex.test(numero) || !numberRegex.test(latitud) || !numberRegex.test(longitud)) {
      Alert.alert('Los campos de número, latitud y longitud deben ser numéricos');
      return false;
    } else if ([cargoDelSitio.length, calle.length, comentarios.length, entreCalleA.length, entreCalleB.length].some((length) => length < 3)) {
      Alert.alert('Los campos de texto deben tener al menos 3 caracteres');
      return false;
    }

    return true;
  }

  const goBack = () => navigation.goBack()

  const handleSubmit = async () => {
    if (!validateFields()) {
      return;
    }

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

    setDisableButton(true);
    console.log('Enviando datos...')

    try {
      let apiBaseUrl = "http://10.0.2.2:8080/api"
      // apiBaseUrl =  "http://localhost:8080/api" // Para dispositivos fisicos
      let endpoint = "/sitios/crear"
      const postUrl = apiBaseUrl + endpoint

      await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((res) => { // Llega vacio desde el back, no es ni json
          console.info('Data desde el backend:', res)
          Alert.alert('Datos enviados correctamente')
          clearInputs()
        })
        .catch(err => {
          console.error('Error desde el backend:')
          console.log(err)
          Alert.alert('Error al enviar los datos, intenta nuevamente');
        })

    } catch (error) {
      console.error('Error al enviar los datos:', error);
      Alert.alert('Error al enviar los datos, intenta nuevamente');
    }
    setDisableButton(false)

  };

  return (
    <SafeAreaView style={styles.container}>

      <StyledTextInput
        style={styles.input}
        placeholder="Cargo del sitio"
        value={cargoDelSitio}
        onChangeText={setCargoDelSitio}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Calle"
        value={calle}
        onChangeText={setCalle}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Apertura"
        value={apertura}
        onPress={setApertura}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Cierre"
        value={cierre}
        onPress={setCierre}
      />


      <StyledTextInput
        style={styles.input}
        placeholder="Comentarios"
        value={comentarios}
        onChangeText={setComentarios}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Entre calle A"
        value={entreCalleA}
        onChangeText={setEntreCalleA}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Entre calle B"
        value={entreCalleB}
        onChangeText={setEntreCalleB}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Número"
        value={numero}
        onChangeText={(value) => handleNumericInputChange(value, setNumero)}
        keyboardType="numeric"
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Latitud"
        value={latitud}
        onChangeText={(value) => handleNumericInputChange(value, setLatitud)}
        keyboardType="numeric"
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Longitud"
        value={longitud}
        onChangeText={(value) => handleNumericInputChange(value, setLongitud)}
        keyboardType="numeric"
      />

      <View style={styles.controls}>
        <StyledButton title="Enviar" style={styles.button} variant={"primary"} onPress={handleSubmit} disabled={disableButton} />
        <StyledButton title="Atras" style={styles.button} variant={"secondary"} onPress={goBack} disabled={disableButton} />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.global.screenInnerPadding,
    gap: 10,
  },
  input: {
    width: '100%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 50,
    gap: 50,
  },
  button: {
    flex: 1
  }
});

export default ServicioProfesional;
