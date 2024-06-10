import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';

import { StyledButton, StyledTextInput } from '../../components/ui';
import { numberRegex } from '../../utils/regex';

import { useRoute } from '@react-navigation/native';

import theme from '../../styles/theme';
import sitiosServices from '../../services/sitios.services';
import { useUser } from '../../context/UserContext';

const defaultSitio = {
  cargoDelSitio: `Sitio de Juan Perez`,
  calle: "",
  numero: "",
  entreCalleA: "",
  entreCalleB: "",
  apertura: "",
  cierre: "",
  descripcion: "",
  comentarios: "",
  longitud: "",
  latitud: "",
}

const ServicioProfesional = ({ navigation }) => {
  const route = useRoute();
  const sitio = route.params?.sitio ?? null;
  const { user } = useUser();
  const [servicio, setServicio] = useState(sitio ?? defaultSitio)

  const [disableButton, setDisableButton] = useState(false);

  const handleChange = (servicioKey, value) => {
    setServicio({ ...servicio, [servicioKey]: value });
  }

  const validateFields = () => {
    const { cargoDelSitio, calle, numero, entreCalleA, entreCalleB, apertura, cierre, comentarios, longitud, latitud } = servicio;

    if (
      [cargoDelSitio, calle, numero, entreCalleA, entreCalleB, apertura, cierre, comentarios, longitud, latitud].some((field) => Boolean(field) === false)
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
    console.log('Enviando datos...')

    try {
      Promise.resolve(() => setDisableButton(true))
        .then(() => sitiosServices.saveSitio({ ...servicio, documento: user.identificador }, Boolean(sitio)))
        .then((ok) => { // Llega vacio desde el back, no es ni json
          if (!ok) {
            throw new Error('Error al enviar los datos');
          } 
          
          console.info('Salvado por el backend', ok)
          Alert.alert('Datos enviados correctamente')
          navigation.navigate('SeleccionTipo')
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
        placeholder="A cargo de quien esta el sitio?"
        value={servicio.cargoDelSitio}
        onChangeText={t => handleChange('cargoDelSitio', t)}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Descripción"
        value={servicio.descripcion}
        onChangeText={t => handleChange('descripcion', t)}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Calle"
        value={servicio.calle}
        onChangeText={t => handleChange('calle', t)}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Horario apertura"
        value={servicio.apertura}
        onChangeText={t => handleChange('apertura', t)}
      />


      <StyledTextInput
        style={styles.input}
        placeholder="Horario cierre"
        value={servicio.cierre}
        onChangeText={t => handleChange('cierre', t)}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Comentarios"
        value={servicio.comentarios}
        onChangeText={t => handleChange('comentarios', t)}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Entre calle A"
        value={servicio.entreCalleA}
        onChangeText={t => handleChange('entreCalleA', t)}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Entre calle B"
        value={servicio.entreCalleB}
        onChangeText={t => handleChange('entreCalleB', t)}
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Número"
        value={servicio.numero}
        onChangeText={t => handleChange('numero', t)}
        keyboardType="numeric"
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Latitud"
        value={servicio.latitud}
        onChangeText={t => handleChange('latitud', t)}
        keyboardType="numeric"
      />

      <StyledTextInput
        style={styles.input}
        placeholder="Longitud"
        value={servicio.longitud}
        onChangeText={t => handleChange('longitud', t)}
        keyboardType="numeric"
      />

      <View style={styles.controls}>
        <StyledButton title={Boolean(sitio) ? "Editar" : "Crear"} style={styles.button} variant={"primary"} onPress={handleSubmit} disabled={disableButton} />
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
