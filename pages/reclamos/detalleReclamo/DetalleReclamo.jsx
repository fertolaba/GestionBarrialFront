import { View } from 'react-native'
import React from 'react'
import { StyledButton, StyledText } from '../../../components/ui';
import { useUser } from '../../../context/UserContext';
import { exists } from '../../../utils/misc';

export default function DetalleReclamo({ route, navigation }) {
  const { user } = useUser()
  const { reclamo } = route.params;

  const handleMarcarComoResuelto = () => {
    console.log('marcar como resuelto');
  }

  const handleAnularDenuncia = () => {
    console.log('anular denuncia');
  }

  return (
    <View>
      <StyledText>Detalle de reclamo</StyledText>
      <StyledText bold>
        {
          (
            user.tipoUsuario === 'inspector'
              ? reclamo.personal?.legajo === user?.legajo && "Reclamo de otro usuario"
              : reclamo.vecino?.documento === user?.documento
          ) && "Este es un reclamo de tu autoría"
        }
      </StyledText>
      <StyledText>
        {
          JSON.stringify(reclamo, null, 2)
        }
      </StyledText>

      {
        user?.tipoUsuario === 'inspector' && reclamo.personal?.legajo != user.legajo &&
        (
          <View>
            <StyledButton variant='success' title="Marcar reclamo resuelto" />
            <StyledButton variant='warning' title="Anular reclamo" />
          </View>
        )
      }

      <StyledButton title='Volver' variant='secondary' onPress={() => navigation.goBack()} />
    </View>
  )
}