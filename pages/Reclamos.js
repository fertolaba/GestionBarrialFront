import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CreateButton, StateButton } from '../components/Buttons';

export default function Reclamos() {
  const navigation = useNavigation();

  return (
    <View>
      
      <CreateButton text="Generar Reclamos" onPress={() => navigation.navigate('GenerarReclamos')} />
      <StateButton text="Estado de Reclamo" onPress={() => navigation.navigate('EstadoReclamo')} />
    </View>
  );
}
