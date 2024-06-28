import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyledButton } from '../../../components/ui';

export default function EstadoReclamo() {
  const navigation = useNavigation();

  return (
    <View>
      <Text>EstadoReclamo</Text>

      <StyledButton title='Volver' variant='secondary' onPress={() => navigation.goBack()} />
    </View>
  )
}