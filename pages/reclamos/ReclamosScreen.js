import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/UserContext';
import { isNullOrUndefined } from '../../utils/misc';
import ReclamoHomeVecino from './_reclamoHomeVecino';
import ReclamoHomeInspector from './_reclamoHomeInspector';

export default function ReclamosScreen() {
  const { user } = useUser()
  const navigation = useNavigation();

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
      screenPorTipoUsuario = <Text>Usuario no reconocido</Text>;
      break;
  }


  return (
    <View>
      {screenPorTipoUsuario}
    </View>
  );
}
