import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StyledButton, StyledTextInput } from '../../components/ui';
import { useNavigation } from '@react-navigation/native';

const GenerarReclamos = () => {
  const navigation = useNavigation();

  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [desperfecto, setDesperfecto] = useState('');
  const [causa, setCausa] = useState('');


  return (
    <View style={styles.container}>

      <StyledTextInput
        style={styles.input}
        placeholder="Calle"
        value={calle}
        onChangeText={setCalle}
      />
      <StyledTextInput
        style={styles.input}
        placeholder="Numero"
        value={numero}
        onChangeText={setNumero}
      />
      <StyledTextInput
        style={styles.input}
        placeholder="Desperfecto"
        value={desperfecto}
        onChangeText={setDesperfecto}
      />
      <StyledTextInput
        style={styles.textArea}
        placeholder="Causa del reclamo"
        value={causa}
        onChangeText={setCausa}
        multiline
      />

      <StyledButton
        title="Generar reclamo"
        variant='primary'
        fontSize='subheading'
      />
      <StyledButton
        title="Volver"
        variant='secondary'
        fontSize='subheading'
        onPress={() => navigation.goBack()}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButtonActive: {
    backgroundColor: '#4F46E5',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  toggleButtonInactive: {
    backgroundColor: '#E5E5E5',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  toggleButtonTextActive: {
    color: '#fff',
  },
  toggleButtonTextInactive: {
    color: '#000',
  },
  input: {
    width: '100%',
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  icon: {
    width: 50,
    height: 50,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  checkboxText: {
    marginLeft: 10,
    flex: 1,
  },


});

export default GenerarReclamos;
