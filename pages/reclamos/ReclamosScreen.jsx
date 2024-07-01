import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import ReclamoHome from './_reclamoHome';
import { StyledButton, StyledText } from '../../components/ui';

export default function ReclamosScreen() {
  const navigation = useNavigation();
  const { user } = useUser()

  let screenPorTipoUsuario = null;

  // Esta solo como ejemplo, en este caso son el mismo componente con diferentes comportamientos adentro
  switch (user?.tipoUsuario) {
    case 'vecino':
      screenPorTipoUsuario = <ReclamoHome />;
      break;
    case 'inspector':
      screenPorTipoUsuario = <ReclamoHome />;
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
