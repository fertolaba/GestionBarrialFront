import { View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StyledButton, StyledText } from '../../../components/ui';

export default function DetalleReclamo({ route }) {
  const navigation = useNavigation();
  const { reclamo } = route.params;

  return (
    <View>
      <StyledText>Detalle de reclamo</StyledText>
      <StyledText>
        {
          JSON.stringify(reclamo, null, 2)
        }
      </StyledText>

      <StyledButton title='Volver' variant='secondary' onPress={() => navigation.goBack()} />
    </View>
  )
}