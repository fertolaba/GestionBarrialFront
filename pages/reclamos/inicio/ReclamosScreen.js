import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../../context/UserContext';
import ReclamoHomeVecino from './_reclamoHomeVecino';
import ReclamoHomeInspector from './_reclamoHomeInspector';
import { StyledButton, StyledText } from '../../../components/ui';

export default function ReclamosScreen() {
  const navigation = useNavigation();
  const { user } = useUser()

  let screenPorTipoUsuario = null;

  switch (user?.tipoUsuario) {
    case 'vecino':
      screenPorTipoUsuario = <ReclamoHomeVecino />;
      break;
    case 'inspector':
      screenPorTipoUsuario = <ReclamoHomeInspector />;
      break;
    default:
      screenPorTipoUsuario = (
        <View>
          <StyledText color='red'>Usuario no reconocido</StyledText>
          <StyledButton title='Volver' variant='secondary' onPress={() => navigation.goBack()} />
        </View>
      );
  }

  return screenPorTipoUsuario
}
