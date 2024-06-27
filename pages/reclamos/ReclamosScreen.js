import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { isNullOrUndefined } from '../../utils/misc';
import ReclamoHomeVecino from './_reclamoHomeVecino';
import ReclamoHomeInspector from './_reclamoHomeInspector';
import { StyledText } from '../../components/ui';

export default function ReclamosScreen() {
  const navigation = useNavigation();
  const { user } = useUser()

  if (isNullOrUndefined(user)) navigation.reset({ index: 0, routes: [{ name: 'Login' }] })

  let screenPorTipoUsuario = null;

  switch (user.tipoUsuario) {
    case 'vecino':
      screenPorTipoUsuario = <ReclamoHomeVecino />;
      break;
    case 'inspector':
      screenPorTipoUsuario = <ReclamoHomeInspector />;
      break;
    default:
      screenPorTipoUsuario = <StyledText color='red'>Usuario no reconocido</StyledText>;
      break;
  }


  return (
    <View>
      {screenPorTipoUsuario}
    </View>
  );
}
